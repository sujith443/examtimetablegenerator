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
    } else if (Array.isArray(courses)) {
      // If courses are already an array
      courses = courses;
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
      count: 0,
      studentIds: new Set()
    };
  });
  
  studentData.forEach(student => {
    let courses = student.Courses;
    
    if (typeof courses === 'string') {
      courses = courses.split(',').map(course => course.trim());
    } else if (typeof courses === 'number') {
      courses = [courses.toString()];
    } else if (Array.isArray(courses)) {
      courses = courses;
    } else if (!courses) {
      courses = [];
    }
    
    courses.forEach(course => {
      if (course && studentGroups[course]) {
        studentGroups[course].branches.add(student.Branch);
        studentGroups[course].years.add(student.Year);
        studentGroups[course].semesters.add(student.Semester);
        studentGroups[course].studentIds.add(student["Student ID"]);
        studentGroups[course].count++;
      }
    });
  });
  
  // Convert Sets to Arrays for easier use
  Object.keys(studentGroups).forEach(course => {
    studentGroups[course].branches = Array.from(studentGroups[course].branches);
    studentGroups[course].years = Array.from(studentGroups[course].years);
    studentGroups[course].semesters = Array.from(studentGroups[course].semesters);
    studentGroups[course].studentIds = Array.from(studentGroups[course].studentIds);
  });
  
  return studentGroups;
};

// Assign venues based on student count
export const assignVenue = (course, studentGroups, venues) => {
  const studentCount = studentGroups[course].count;
  
  if (venues.length <= 0) return "No venue available";
  
  if (studentCount <= 50) return venues[0];
  if (studentCount <= 100 && venues.length > 1) return venues[1];
  if (studentCount <= 150 && venues.length > 2) return venues[2];
  if (studentCount <= 200 && venues.length > 3) return venues[3];
  return venues[venues.length - 1]; // Largest venue for more students
};

// Check if there are common students between two courses
export const hasCommonStudents = (course1, course2, studentGroups) => {
  // If the courses are the same, they definitely share students
  if (course1 === course2) return true;
  
  const group1 = studentGroups[course1];
  const group2 = studentGroups[course2];
  
  if (!group1 || !group2) return false;
  
  // Quick check: if there's no overlap in branches, years, or semesters, there can't be common students
  const branchOverlap = group1.branches.some(branch => group2.branches.includes(branch));
  if (!branchOverlap) return false;
  
  const yearOverlap = group1.years.some(year => group2.years.includes(year));
  if (!yearOverlap) return false;
  
  const semesterOverlap = group1.semesters.some(semester => group2.semesters.includes(semester));
  if (!semesterOverlap) return false;
  
  // If we have studentIds, check for direct overlap
  if (group1.studentIds && group2.studentIds) {
    return group1.studentIds.some(id => group2.studentIds.includes(id));
  }
  
  // Default to true if we can't definitively rule out overlap
  return true;
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
  let timeSlot = 1; // 1 for morning, 2 for afternoon, 3 for evening
  let courseIndex = 0;
  
  // Function to check if course can be scheduled at this time
  const canScheduleCourse = (course, date, slot) => {
    // Check if any exam is already scheduled at this time and has common students
    for (const scheduledExam of schedule) {
      if (scheduledExam.date.getTime() === date.getTime() && scheduledExam.timeSlot === slot) {
        // Check for student overlap using optimized function
        if (hasCommonStudents(course, scheduledExam.course, studentGroups)) {
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
      const startTimeMap = {
        1: '9:00 AM',
        2: '2:00 PM',
        3: '6:00 PM'
      };
      
      const endTimeMap = {
        1: `${9 + examDuration}:00 ${examDuration >= 3 ? 'PM' : 'AM'}`,
        2: `${2 + examDuration}:00 PM`,
        3: `${6 + examDuration}:00 PM`
      };
      
      schedule.push({
        course,
        date: new Date(currentDate),
        timeSlot,
        venue: assignVenue(course, studentGroups, venues),
        branches: studentGroups[course].branches,
        years: studentGroups[course].years,
        semesters: studentGroups[course].semesters,
        studentCount: studentGroups[course].count,
        startTime: startTimeMap[timeSlot],
        endTime: endTimeMap[timeSlot]
      });
      
      courseIndex++;
    }
    
    // Move to next time slot or date
    if (timeSlot < examsPerDay) {
      timeSlot++;
    } else {
      timeSlot = 1;
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 1 + gapBetweenExams);
    }
  }
  
  // Check if all courses were scheduled
  let error = null;
  if (courseIndex < courses.length) {
    error = `Could not schedule all exams within the given date range. Only ${courseIndex} out of ${courses.length} courses were scheduled. Consider extending the exam period or adjusting parameters.`;
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
  if (!examSchedule || examSchedule.length === 0) return;
  
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
  
  // Set column widths
  const colWidths = [
    { wch: 10 }, // Course
    { wch: 20 }, // Date
    { wch: 20 }, // Time
    { wch: 15 }, // Venue
    { wch: 20 }, // Branches
    { wch: 10 }, // Years
    { wch: 15 }, // Semesters
    { wch: 15 }  // Student Count
  ];
  
  ws['!cols'] = colWidths;
  
  // Add title row with merged cells
  const range = { s: { c: 0, r: 0 }, e: { c: 7, r: 0 } };
  const titleRow = [{ v: 'SVIT College - Exam Schedule', t: 's', s: { font: { bold: true, sz: 14 }, alignment: { horizontal: 'center' } } }];
  
  // Insert the title row
  const newWs = XLSX.utils.sheet_add_aoa(
    XLSX.utils.sheet_new(),
    [titleRow, [], ['Course', 'Date', 'Time', 'Venue', 'Branches', 'Years', 'Semesters', 'Student Count']],
    { origin: 'A1' }
  );
  
  // Add the data starting from row 4
  const jsonData = XLSX.utils.sheet_to_json(ws);
  XLSX.utils.sheet_add_json(newWs, jsonData, { origin: 'A4', skipHeader: true });
  
  // Set merged cell for title
  newWs['!merges'] = [range];
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, newWs, 'Exam Schedule');
  
  // Add current date to filename
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  
  // Generate Excel file
  XLSX.writeFile(wb, `SVIT_Exam_Schedule_${dateStr}.xlsx`);
};

// Detect scheduling conflicts
export const getConflictInfo = (schedule) => {
  const conflicts = [];
  
  // Group exams by date and time slot for easier processing
  const examsByDateTime = {};
  
  schedule.forEach(exam => {
    const dateStr = formatDate(exam.date);
    const timeKey = `${dateStr}_${exam.timeSlot}`;
    
    if (!examsByDateTime[timeKey]) {
      examsByDateTime[timeKey] = [];
    }
    
    examsByDateTime[timeKey].push(exam);
  });
  
  // Check for conflicts within each time slot
  Object.entries(examsByDateTime).forEach(([timeKey, exams]) => {
    // Skip if only one exam in this time slot
    if (exams.length <= 1) return;
    
    // Check each pair of exams for branch/year/semester overlap
    for (let i = 0; i < exams.length; i++) {
      for (let j = i + 1; j < exams.length; j++) {
        const exam1 = exams[i];
        const exam2 = exams[j];
        
        // Find overlap in branches, years, and semesters
        const branchOverlap = exam1.branches.filter(branch => exam2.branches.includes(branch));
        const yearOverlap = exam1.years.filter(year => exam2.years.includes(year));
        const semesterOverlap = exam1.semesters.filter(semester => exam2.semesters.includes(semester));
        
        // If there's overlap in all three dimensions, we have a conflict
        if (branchOverlap.length > 0 && yearOverlap.length > 0 && semesterOverlap.length > 0) {
          conflicts.push({
            date: formatDate(exam1.date),
            time: exam1.startTime,
            courses: [exam1.course, exam2.course],
            branches: branchOverlap,
            years: yearOverlap,
            semesters: semesterOverlap,
            severity: 'high' // Could implement a severity algorithm later
          });
        }
      }
    }
  });
  
  return conflicts;
};