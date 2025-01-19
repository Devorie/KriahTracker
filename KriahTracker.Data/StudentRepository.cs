using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.Globalization;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using CsvHelper;
using CsvHelper.Configuration;
using System.Runtime.ExceptionServices;
using System.Security.Claims;
using KriahTracker.Data.Migrations;
using static Azure.Core.HttpHeader;
using static System.Collections.Specialized.BitVector32;

namespace KriahTracker.Data
{
    public class StudentRepository
    {
        private readonly string _connectionString;

        public StudentRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<StudentView> GetAll()
        {
            using var context = new KriahTrackerDataContext(_connectionString);
            Year year = context.Years.OrderByDescending(y => y.Name).FirstOrDefault();
            List<Student> students = context.Students.Include(s => s.InfoByYear).ToList();
            List<StudentView> studentsView = new();
            foreach (Student s in students)
            {
                if (s.InfoByYear.Any(i => i.YearId == year.Id))
                {
                    string c = null;
                    if (s.InfoByYear.Count > 0)
                    {
                        c = s.InfoByYear.FirstOrDefault(i => i.YearId == year.Id).Class;
                    }
                    studentsView.Add(new()
                    {
                        Id = s.Id,
                        FirstName = s.FirstName,
                        LastName = s.LastName,
                        BirthDay = s.BirthDay,
                        Class = c,
                        CurrentYear = year,
                        InfoByYear = s.InfoByYear

                    });
                    foreach (StudentInfoByYear info in s.InfoByYear)
                    {
                        info.Year = context.Years.FirstOrDefault(y => y.Id == info.YearId);
                    }
                }
                
            }
            return studentsView;
        }

        public List<StudentView> GetByTutor(int tutorId)
        {
            using var context = new KriahTrackerDataContext(_connectionString);
            Year year = context.Years.OrderByDescending(y => y.Name).FirstOrDefault();
            List<Student> students = context.Students
                    .Include(s => s.InfoByYear)
                    .Where(s => s.InfoByYear.Any(info =>
                        info.TermOneTutorId == tutorId ||
                        info.TermTwoTutorId == tutorId ||
                        info.TermThreeTutorId == tutorId))
                    .ToList();
            List<StudentView> studentsView = new();
            foreach (Student s in students)
            {
                if (s.InfoByYear.Any(i => i.YearId == year.Id))
                {
                    string c = null;
                    if (s.InfoByYear.Count > 0)
                    {
                        c = s.InfoByYear.FirstOrDefault(i => i.YearId == year.Id).Class;
                    }
                    studentsView.Add(new()
                    {
                        Id = s.Id,
                        FirstName = s.FirstName,
                        LastName = s.LastName,
                        BirthDay = s.BirthDay,
                        Class = c,
                        CurrentYear = year,
                        InfoByYear = s.InfoByYear

                    });
                    foreach (StudentInfoByYear info in s.InfoByYear)
                    {
                        info.Year = context.Years.FirstOrDefault(y => y.Id == info.YearId);
                    }
                }

            }
            return studentsView;
        }

        public List<StudentInfoByYear> GetInfo(int id)
        {
            using var context = new KriahTrackerDataContext(_connectionString);
            return context.StudentInfoByYears.Where(s => s.StudentId == id).Include(s => s.Year).ToList();
        }

        public void UploadStudents(byte[] csvBytes)
        {
            using var memoryStream = new MemoryStream(csvBytes);
            using var reader = new StreamReader(memoryStream);

            var csvReader = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HeaderValidated = null, 
                MissingFieldFound = null
            });
            
            List<StudentView> students = csvReader.GetRecords<StudentView>().ToList();

            using var context = new KriahTrackerDataContext(_connectionString);
            Year year = context.Years.OrderByDescending(y => y.Name).FirstOrDefault();

            foreach (StudentView sv in students)
            {
                context.Database.ExecuteSqlInterpolated($"INSERT INTO Students (FirstName, LastName, BirthDay) VALUES ({sv.FirstName}, {sv.LastName}, {sv.BirthDay:yyyy-MM-dd}); INSERT INTO StudentInfoByYears (StudentId, Class, YearId) VALUES (SCOPE_IDENTITY(), {sv.Class}, {year.Id});");
            }
        }

        public string GenerateCsv()
        {
            List<StudentView> students = new()
    {
        new StudentView
        {
            FirstName = "Sara",
            LastName = "Stien",
            BirthDay = DateTime.Parse("05/14/2016"),
            Class = "2A"
        },
        new StudentView
        {
            FirstName = "Rivky",
            LastName = "Weiss",
            BirthDay = DateTime.Parse("01/23/2018"),
            Class = "4B"
        },
        new StudentView
        {
            FirstName = "Rochel",
            LastName = "Shore",
            BirthDay = DateTime.Parse("10/24/2014"),
            Class = "PB"
        },
        new StudentView
        {
            FirstName = "Penina",
            LastName = "Fine",
            BirthDay = DateTime.Parse("09/13/2021"),
            Class = "7"
        },
        new StudentView
        {
            FirstName = "Leah",
            LastName = "Green",
            BirthDay = DateTime.Parse("02/10/2022"),
            Class = "8"
        }
    };

            var writer = new StringWriter();
            var csvWriter = new CsvWriter(writer, new CsvConfiguration(CultureInfo.InvariantCulture));

            // Write records without the original BirthDay
            csvWriter.WriteRecords(students.Select(s => new
            {
                s.FirstName,
                s.LastName,
                BirthDay = s.BirthDay.ToString("M/d/yyyy"),
                s.Class
            }));

            return writer.ToString();
        }

        public void AddStudent(StudentView s)
        {
            using var context = new KriahTrackerDataContext(_connectionString);
            Year year = context.Years.OrderByDescending(y => y.Name).FirstOrDefault();
            context.Database.ExecuteSqlInterpolated($"INSERT INTO Students (FirstName, LastName, BirthDay) VALUES ({s.FirstName}, {s.LastName}, {s.BirthDay:yyyy-MM-dd}); INSERT INTO StudentInfoByYears (StudentId, Class, YearId) VALUES (SCOPE_IDENTITY(), {s.Class}, {year.Id});");
        }

        public void AddEditMark(int term, int studentId, string accuracy, string fluency, string notes, string action)
        {
            using var context = new KriahTrackerDataContext(_connectionString);
            Year year = context.Years.OrderByDescending(y => y.Name).FirstOrDefault();
            if (term == 1)
            {
                context.StudentInfoByYears.Where(i => i.StudentId == studentId && i.YearId == year.Id).ExecuteUpdate(setters => setters
                                            .SetProperty(s => s.AccuracyTermOne, accuracy)
                                            .SetProperty(s => s.FluencyTermOne, fluency)
                                            .SetProperty(s => s.NotesTermOne, notes)
                                            .SetProperty(s => s.ActionTermOne, action));
            }
            else if (term == 2)
            {
                context.StudentInfoByYears.Where(i => i.StudentId == studentId && i.YearId == year.Id).ExecuteUpdate(setters => setters
                                            .SetProperty(s => s.AccuracyTermTwo, accuracy)
                                            .SetProperty(s => s.FluencyTermTwo, fluency)
                                            .SetProperty(s => s.NotesTermTwo, notes)
                                            .SetProperty(s => s.ActionTermTwo, action));
            }
            else if (term == 3)
            {
                context.StudentInfoByYears.Where(i => i.StudentId == studentId && i.YearId == year.Id).ExecuteUpdate(setters => setters
                                            .SetProperty(s => s.AccuracyTermThree, accuracy)
                                            .SetProperty(s => s.FluencyTermThree, fluency)
                                            .SetProperty(s => s.NotesTermThree, notes)
                                            .SetProperty(s => s.ActionTermThree, action));
            }
            else
            {
                return;
            }
            context.SaveChanges();
        }

        public void EditClass(List<EditClass> editClasses)
        {
            using var context = new KriahTrackerDataContext(_connectionString);
            Year year = context.Years.OrderByDescending(y => y.Name).FirstOrDefault();
            foreach (var editClass in editClasses)
            {
                context.StudentInfoByYears
                    .Where(i => i.StudentId == editClass.StudentId && i.YearId == year.Id)
                    .ExecuteUpdate(setters => setters
                        .SetProperty(s => s.Class, editClass.NewClass));
            }

            context.SaveChanges();
        }

        public void AddTask(int id, string task)
        {
            using var context = new KriahTrackerDataContext(_connectionString);
            Year year = context.Years.OrderByDescending(y => y.Name).FirstOrDefault();
            Student student = context.Students.FirstOrDefault(student => student.Id == id);
            string className = context.StudentInfoByYears.FirstOrDefault(info => info.StudentId == id && info.YearId == year.Id).Class;
            context.Tasks.Add(new TaskItem
            {
                TaskName = task,
                StudentId = id,
                StudentName = $"{student.FirstName} {student.LastName}",
                StudentClass = className,
                //TaskDate = DateTime.Now
            });
            context.SaveChanges();
        }

        public void AddTutor(string tutorName)
        {
            using var context = new KriahTrackerDataContext(_connectionString);
            context.Tutor.Add(new ()
            {
                Name = tutorName,
                DateAdded = DateTime.Now
            });
            context.SaveChanges();
        }

        public void UpdateTutor(int id, string edited)
        {
            using var context = new KriahTrackerDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated(
               $"UPDATE Tutors SET Name = {edited} WHERE Id = {id}");
        }

        public void RemoveTutor(int id)
        {
            using var context = new KriahTrackerDataContext(_connectionString);
            _ = context.Database.ExecuteSqlInterpolated(
               $"UPDATE Tutors SET Removed = {true}, DateRemoved = {DateTime.Now} WHERE Id = {id}");
        }

        public string GetYear()
        {
            using var context = new KriahTrackerDataContext(_connectionString);
            Year year = context.Years.OrderByDescending(y => y.Name).FirstOrDefault();
            return year.Name;
        }

        public List<Tutor> GetTutors()
        {
            using var context = new KriahTrackerDataContext(_connectionString);
            return context.Tutor.OrderBy(t => t.Name).ToList();
        }

        public List<TaskItem> GetTasks()
        {
            using var context = new KriahTrackerDataContext(_connectionString);
            //return context.Tasks.OrderByDescending(t => t.TaskDate).ToList();
            return context.Tasks.ToList();
        }


        public void UpdateYear(string yearName)
        {
            using var context = new KriahTrackerDataContext(_connectionString);
            Year currentYear = context.Years.OrderByDescending(y => y.Name).FirstOrDefault();

            var newYear = new Year { Name = yearName };
            context.Years.Add(newYear);
            context.SaveChanges();

            int newYearId = newYear.Id;

            var students = context.Students.Include(s => s.InfoByYear).ToList();
            var studentInfoList = students.Select(student =>
            {
                var currentClass = student.InfoByYear.FirstOrDefault(i => i.YearId == currentYear.Id)?.Class;

                if (currentClass != null && !currentClass.Contains('8'))
                {
                    int classNumber;

                    if (currentClass[0].ToString().ToLower() == "p")
                    {
                        classNumber = 0;
                    }
                    else
                    {
                        classNumber = int.Parse(currentClass[0].ToString());
                    }
                    string classSuffix = currentClass.Length > 1 ? currentClass.Substring(1) : "";

                    string incrementedClass = $"{classNumber + 1}{classSuffix}";

                    return new StudentInfoByYear
                    {
                        StudentId = student.Id,
                        YearId = newYearId,
                        Class = incrementedClass
                    };
                }

                return null;
            }).Where(info => info != null).ToList();


            context.StudentInfoByYears.AddRange(studentInfoList);

            int rowsAffected = context.SaveChanges();
            Console.WriteLine($"{rowsAffected} rows inserted.");
        }



    }
}
