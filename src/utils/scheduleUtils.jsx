// utils/scheduleUtils.js
import * as XLSX from 'xlsx';

// Format date for display
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Extract unique courses from student data
export const extractCourses = (studentData) => {
  if (!studentData) return [];
  
  const allCourses = [];
  studentData.forEach(student => {
    // Handle different formats of course data
    let courses = student.Courses;
    
    if (typeof courses === 'string') {
      // If courses are stored as comma-separated string
      courses = courses.split(',').map(course => course.trim());
    } else if (typeof courses === 'number') {
      // If only one course is stored as a number
      courses = [courses.toString()];
    } else if (!courses) {
      // If courses field is empty
      courses = [];
    }
    
    allCourses.push(...courses);
  });
  
  // Return unique courses
  return [...new Set(allCourses)].filter(course => course !== '');
};

// Get student groups for each course
export const getStudentGroupsByCourse = (studentData) => {
  const courses = extractCourses(studentData);
  const studentGroups = {};
  
  courses.forEach(course => {
    studentGroups[course] = {
      branches: new Set(),
      years: new Set(),
      semesters: new Set(),
      count: 0
    };
  });
  
  studentData.forEach(student => {
    let courses = student.Courses;
    
    if (typeof courses === 'string') {
      courses = courses.split(',').map(course => course.trim());
    } else if (typeof courses === 'number') {
      courses = [courses.toString()];
    } else if (!courses) {
      courses = [];
    }
    
    courses.forEach(course => {
      if (course && studentGroups[course]) {
        studentGroups[course].branches.add(student.Branch);
        studentGroups[course].years.add(student.Year);
        studentGroups[course].semesters.add(student.Semester);
        studentGroups[course].count++;
      }
    });
  });
  
  // Convert Sets to Arrays for easier use
  Object.keys(studentGroups).forEach(course => {
    studentGroups[course].branches = Array.from(studentGroups[course].branches);
    studentGroups[course].years = Array.from(studentGroups[course].years);
    studentGroups[course].semesters = Array.from(studentGroups[course].semesters);
  });
  
  return studentGroups;
};

// Assign venues based on student count
export const assignVenue = (course, studentGroups, venues) => {
  const studentCount = studentGroups[course].count;
  if (studentCount <= 50) return venues[0];
  if (studentCount <= 100) return venues[1];
  if (studentCount <= 150) return venues[2];
  if (studentCount <= 200) return venues[3];
  return venues[4]; // Largest venue for more than 200 students
};

// Generate exam schedule
export const generateExamSchedule = (studentData, params, venues) => {
  if (!studentData) {
    return { error: 'Please upload student data first', schedule: [] };
  }
  
  const { startDate, endDate, examDuration, gapBetweenExams, examsPerDay } = params;
  
  if (!startDate || !endDate) {
    return { error: 'Please provide start and end dates', schedule: [] };
  }
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start >= end) {
    return { error: 'End date must be after start date', schedule: [] };
  }
  
  // Get unique courses and student groups
  const courses = extractCourses(studentData);
  const studentGroups = getStudentGroupsByCourse(studentData);
  
  // Create exam scheduling algorithm
  const schedule = [];
  let currentDate = new Date(start);
  let timeSlot = 1; // 1 for morning, 2 for afternoon
  let courseIndex = 0;
  
  // Function to check if course can be scheduled at this time
  const canScheduleCourse = (course, date, slot) => {
    // Check if any student already has an exam at this time
    for (const scheduledExam of schedule) {
      if (scheduledExam.date.getTime() === date.getTime() && scheduledExam.timeSlot === slot) {
        // Check for student overlap
        const currentCourseGroups = studentGroups[course];
        const scheduledCourseGroups = studentGroups[scheduledExam.course];
        
        // Check branch overlap
        const branchOverlap = currentCourseGroups.branches.some(branch => 
          scheduledCourseGroups.branches.includes(branch)
        );
        
        // Check year overlap
        const yearOverlap = currentCourseGroups.years.some(year => 
          scheduledCourseGroups.years.includes(year)
        );
        
        // Check semester overlap
        const semesterOverlap = currentCourseGroups.semesters.some(semester => 
          scheduledCourseGroups.semesters.includes(semester)
        );
        
        // If there's overlap in all three, we can't schedule here
        if (branchOverlap && yearOverlap && semesterOverlap) {
          return false;
        }
      }
    }
    
    return true;
  };
  
  // Schedule courses
  while (courseIndex < courses.length && currentDate <= end) {
    const course = courses[courseIndex];
    
    // Skip weekends (Saturday and Sunday)
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
      timeSlot = 1;
      continue;
    }
    
    if (canScheduleCourse(course, currentDate, timeSlot)) {
      // Schedule the exam
      schedule.push({
        course,
        date: new Date(currentDate),
        timeSlot,
        venue: assignVenue(course, studentGroups, venues),
        branches: studentGroups[course].branches,
        years: studentGroups[course].years,
        semesters: studentGroups[course].semesters,
        studentCount: studentGroups[course].count,
        startTime: timeSlot === 1 ? '9:00 AM' : '2:00 PM',
        endTime: timeSlot === 1 ? '12:00 PM' : '5:00 PM'
      });
      
      courseIndex++;
    }
    
    // Move to next time slot or date
    if (timeSlot < examsPerDay) {
      timeSlot++;
    } else {
      timeSlot = 1;
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + gapBetweenExams);
    }
  }
  
  // Check if all courses were scheduled
  let error = null;
  if (courseIndex < courses.length) {
    error = `Could not schedule all exams within the given date range. Only ${courseIndex} out of ${courses.length} courses were scheduled.`;
  }
  
  // Sort schedule by date and time slot
  schedule.sort((a, b) => {
    if (a.date.getTime() !== b.date.getTime()) {
      return a.date.getTime() - b.date.getTime();
    }
    return a.timeSlot - b.timeSlot;
  });
  
  return { error, schedule };
};

// Export schedule to Excel
export const exportToExcel = (examSchedule) => {
  if (!examSchedule) return;
  
  // Prepare data for export
  const data = examSchedule.map(exam => ({
    'Course': exam.course,
    'Date': formatDate(exam.date),
    'Time': `${exam.startTime} - ${exam.endTime}`,
    'Venue': exam.venue,
    'Branches': exam.branches.join(', '),
    'Years': exam.years.join(', '),
    'Semesters': exam.semesters.join(', '),
    'Student Count': exam.studentCount
  }));
  
  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(data);
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Exam Schedule');
  
  // Generate Excel file
  XLSX.writeFile(wb, 'Exam_Schedule.xlsx');
};

// Format conflict detection info
export const getConflictInfo = (schedule) => {
  const conflicts = [];
  
  for (let i = 0; i < schedule.length; i++) {
    for (let j = i + 1; j < schedule.length; j++) {
      const exam1 = schedule[i];
      const exam2 = schedule[j];
      
      // Check if exams are on the same date and time slot
      if (exam1.date.getTime() === exam2.date.getTime() && exam1.timeSlot === exam2.timeSlot) {
        // Check for student group overlap
        const branchOverlap = exam1.branches.some(branch => exam2.branches.includes(branch));
        const yearOverlap = exam1.years.some(year => exam2.years.includes(year));
        const semesterOverlap = exam1.semesters.some(semester => exam2.semesters.includes(semester));
        
        if (branchOverlap && yearOverlap && semesterOverlap) {
          conflicts.push({
            date: formatDate(exam1.date),
            time: exam1.startTime,
            courses: [exam1.course, exam2.course],
            branches: exam1.branches.filter(branch => exam2.branches.includes(branch)),
            years: exam1.years.filter(year => exam2.years.includes(year)),
            semesters: exam1.semesters.filter(semester => exam2.semesters.includes(semester))
          });
        }
      }
    }
  }
  
  return conflicts;
};