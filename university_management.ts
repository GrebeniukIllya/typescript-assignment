// university_management.ts
//
// Система управління навчальним процесом університету з використанням TypeScript Enums.
// У цьому файлі оголошені всі необхідні переліки (Enum), інтерфейси та реалізований
// клас UniversityManagementSystem. Клас дозволяє реєструвати студентів на курси,
// виставляти оцінки, оновлювати статуси та виконувати інші операції, необхідні
// для управління навчальним процесом.

// Enum для статусів студентів
export enum StudentStatus {
  Active = 'Active',
  Academic_Leave = 'Academic_Leave',
  Graduated = 'Graduated',
  Expelled = 'Expelled'
}

// Enum для типів курсів
export enum CourseType {
  Mandatory = 'Mandatory',
  Optional = 'Optional',
  Special = 'Special'
}

// Enum для семестрів
export enum Semester {
  First = 'First',
  Second = 'Second'
}

// Enum для оцінок (числові значення відповідають традиційній п’ятибальній шкалі)
export enum GradeEnum {
  Excellent = 5,
  Good = 4,
  Satisfactory = 3,
  Unsatisfactory = 2
}

// Enum для факультетів
export enum Faculty {
  Computer_Science = 'Computer_Science',
  Economics = 'Economics',
  Law = 'Law',
  Engineering = 'Engineering'
}

// Інтерфейс студента
export interface Student {
  id: number;
  fullName: string;
  faculty: Faculty;
  year: number;
  status: StudentStatus;
  enrollmentDate: Date;
  groupNumber: string;
}

// Інтерфейс курсу
export interface Course {
  id: number;
  name: string;
  type: CourseType;
  credits: number;
  semester: Semester;
  faculty: Faculty;
  maxStudents: number;
}

// Інтерфейс оцінки (запис оцінки) – окрема назва щоб не конфліктувати з enum GradeEnum
export interface GradeRecord {
  studentId: number;
  courseId: number;
  grade: GradeEnum;
  date: Date;
  semester: Semester;
}

// Клас, який інкапсулює логіку управління університетом
export class UniversityManagementSystem {
  private students: Student[] = [];
  private courses: Course[] = [];
  private grades: GradeRecord[] = [];
  private registrations: { studentId: number; courseId: number }[] = [];
  private nextStudentId = 1;
  private nextCourseId = 1;

  // Додає новий курс у систему
  public addCourse(course: Omit<Course, 'id'>): Course {
    const newCourse: Course = { id: this.nextCourseId++, ...course };
    this.courses.push(newCourse);
    return newCourse;
  }

  /**
   * Реєструє (зараховує) студента у систему.
   * @param student - дані про студента без поля id
   * @returns створений студент з присвоєним id
   */
  public enrollStudent(student: Omit<Student, 'id'>): Student {
    const newStudent: Student = { id: this.nextStudentId++, ...student };
    this.students.push(newStudent);
    return newStudent;
  }

  /**
   * Реєструє студента на курс після перевірок на відповідність факультету та кількість місць.
   * @param studentId - ідентифікатор студента
   * @param courseId - ідентифікатор курсу
   * @throws Помилка, якщо студент або курс не знайдені чи існує конфлікт
   */
  public registerForCourse(studentId: number, courseId: number): void {
    const student = this.students.find((s) => s.id === studentId);
    const course = this.courses.find((c) => c.id === courseId);
    if (!student) throw new Error('Student not found');
    if (!course) throw new Error('Course not found');
    if (student.status !== StudentStatus.Active) {
      throw new Error('Only active students can register for courses');
    }
    if (student.faculty !== course.faculty) {
      throw new Error('Student faculty does not match course faculty');
    }
    // Підраховуємо кількість зареєстрованих студентів на курс
    const enrolledCount = this.registrations.filter((reg) => reg.courseId === courseId).length;
    if (enrolledCount >= course.maxStudents) {
      throw new Error('Course is full');
    }
    // Перевірка, чи вже зареєстрований студент на цей курс
    const alreadyRegistered = this.registrations.some(
      (reg) => reg.studentId === studentId && reg.courseId === courseId
    );
    if (alreadyRegistered) {
      throw new Error('Student is already registered for this course');
    }
    this.registrations.push({ studentId, courseId });
  }

  /**
   * Виставляє оцінку студенту за курс. Перевіряє, чи студент зареєстрований на курс.
   * @param studentId - ідентифікатор студента
   * @param courseId - ідентифікатор курсу
   * @param grade - оцінка згідно GradeEnum
   * @throws Помилка, якщо студент не знайдений, курс не знайдений або студент не зареєстрований
   */
  public setGrade(studentId: number, courseId: number, grade: GradeEnum): void {
    const student = this.students.find((s) => s.id === studentId);
    const course = this.courses.find((c) => c.id === courseId);
    if (!student) throw new Error('Student not found');
    if (!course) throw new Error('Course not found');
    const registered = this.registrations.some(
      (reg) => reg.studentId === studentId && reg.courseId === courseId
    );
    if (!registered) {
      throw new Error('Student is not registered for the course');
    }
    const record: GradeRecord = {
      studentId,
      courseId,
      grade,
      date: new Date(),
      semester: course.semester
    };
    this.grades.push(record);
  }

  /**
   * Оновлює статус студента. Дозволяє встановити новий статус тільки активному або студенту на академвідпустці.
   * @param studentId - ідентифікатор студента
   * @param newStatus - новий статус із StudentStatus
   */
  public updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
    const student = this.students.find((s) => s.id === studentId);
    if (!student) throw new Error('Student not found');
    // Простий приклад валідації: забороняємо повертати вигнаного чи випускника в активний стан
    if (
      (student.status === StudentStatus.Expelled || student.status === StudentStatus.Graduated) &&
      newStatus === StudentStatus.Active
    ) {
      throw new Error('Cannot reactivate expelled or graduated student');
    }
    student.status = newStatus;
  }

  /**
   * Повертає масив студентів певного факультету.
   * @param faculty - факультет
   */
  public getStudentsByFaculty(faculty: Faculty): Student[] {
    return this.students.filter((s) => s.faculty === faculty);
  }

  /**
   * Повертає масив всіх оцінок конкретного студента.
   * @param studentId - ідентифікатор студента
   */
  public getStudentGrades(studentId: number): GradeRecord[] {
    return this.grades.filter((g) => g.studentId === studentId);
  }

  /**
   * Повертає доступні курси для певного факультету й семестру. Можна опціонально
   * фільтрувати курси, які ще мають вільні місця.
   * @param faculty - факультет
   * @param semester - семестр
   */
  public getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
    return this.courses.filter(
      (c) => c.faculty === faculty && c.semester === semester &&
        this.registrations.filter((r) => r.courseId === c.id).length < c.maxStudents
    );
  }

  /**
   * Обчислює середній бал студента на підставі його оцінок. Якщо оцінок немає,
   * повертає 0.
   * @param studentId - ідентифікатор студента
   */
  public calculateAverageGrade(studentId: number): number {
    const studentGrades = this.getStudentGrades(studentId);
    if (studentGrades.length === 0) return 0;
    const total = studentGrades.reduce((sum, gr) => sum + gr.grade, 0);
    return total / studentGrades.length;
  }

  /**
   * Повертає список студентів‑відмінників певного факультету. У цьому прикладі
   * відмінником вважається студент із середнім балом >= 4.5 (між "Good" і "Excellent").
   * @param faculty - факультет
   */
  public getHonorsStudentsByFaculty(faculty: Faculty): Student[] {
    return this.students
      .filter((s) => s.faculty === faculty)
      .filter((s) => this.calculateAverageGrade(s.id) >= 4.5);
  }
}

// ------- Приклад використання -------
// Створюємо екземпляр системи
const university = new UniversityManagementSystem();

// Додаємо кілька курсів
const course1 = university.addCourse({
  name: 'Програмування 101',
  type: CourseType.Mandatory,
  credits: 5,
  semester: Semester.First,
  faculty: Faculty.Computer_Science,
  maxStudents: 2
});
const course2 = university.addCourse({
  name: 'Економічна теорія',
  type: CourseType.Mandatory,
  credits: 4,
  semester: Semester.First,
  faculty: Faculty.Economics,
  maxStudents: 3
});

// Зараховуємо студентів
const studentA = university.enrollStudent({
  fullName: 'Іван Іванов',
  faculty: Faculty.Computer_Science,
  year: 1,
  status: StudentStatus.Active,
  enrollmentDate: new Date('2025-09-01'),
  groupNumber: 'CS-01'
});
const studentB = university.enrollStudent({
  fullName: 'Петро Петренко',
  faculty: Faculty.Computer_Science,
  year: 1,
  status: StudentStatus.Active,
  enrollmentDate: new Date('2025-09-01'),
  groupNumber: 'CS-01'
});
const studentC = university.enrollStudent({
  fullName: 'Марія Марченко',
  faculty: Faculty.Economics,
  year: 1,
  status: StudentStatus.Active,
  enrollmentDate: new Date('2025-09-01'),
  groupNumber: 'EC-01'
});

// Реєструємо студентів на курси
university.registerForCourse(studentA.id, course1.id);
university.registerForCourse(studentB.id, course1.id);
// Далі курс1 заповнений, наступний виклик призведе до помилки (для демонстрації)
try {
  university.registerForCourse(studentC.id, course1.id);
} catch (err) {
  console.error('Register error:', (err as Error).message);
}
university.registerForCourse(studentC.id, course2.id);

// Виставляємо оцінки
university.setGrade(studentA.id, course1.id, GradeEnum.Excellent);
university.setGrade(studentB.id, course1.id, GradeEnum.Good);
university.setGrade(studentC.id, course2.id, GradeEnum.Satisfactory);

// Оновлюємо статус
university.updateStudentStatus(studentC.id, StudentStatus.Academic_Leave);

// Отримуємо студентів за факультетом та середні бали
const csStudents = university.getStudentsByFaculty(Faculty.Computer_Science);
const econStudents = university.getStudentsByFaculty(Faculty.Economics);
const csHonors = university.getHonorsStudentsByFaculty(Faculty.Computer_Science);

// Виводимо інформацію у консоль
console.log('CS Students:', csStudents);
console.log('Economics Students:', econStudents);
console.log('CS Honors Students:', csHonors);
console.log('Average grade of student A:', university.calculateAverageGrade(studentA.id));