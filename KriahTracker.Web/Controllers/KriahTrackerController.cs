using KriahTracker.Web.ViewModels;
using KriahTracker.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace KriahTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KriahTrackerController : ControllerBase
    {
        private readonly string _connectionString;

        public KriahTrackerController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getStudents")]
        public List<StudentView> GetStudents(int tutorId)
        {
            var repo = new StudentRepository(_connectionString);
            if (tutorId > 0)
            {
                return repo.GetByTutor(tutorId);
            }
            return repo.GetAll();

        }

        [HttpGet("getInfo")]
        public List<StudentInfoByYear> GetInfo(int id)
        {
            var repo = new StudentRepository(_connectionString);
            return repo.GetInfo(id);

        }

        [HttpGet("getTutors")]
        public List<Tutor> GetTutors()
        {
            var repo = new StudentRepository(_connectionString);
            return repo.GetTutors();

        }

        [HttpGet("getListOfTasks")]
        public List<TaskItem> GetListOfTasks()
        { 
            var repo = new StudentRepository(_connectionString);
            return repo.GetTasks();

        }

        [HttpGet("getYear")]
        public string GetYear()
        {
            var repo = new StudentRepository(_connectionString);
            return repo.GetYear();

        }

        [HttpPost("upload")]
        public void Upload(UploadViewModel vm)
        {
            var repo = new StudentRepository(_connectionString);
            int indexOfComma = vm.Base64Data.IndexOf(',');
            string base64 = vm.Base64Data.Substring(indexOfComma + 1);
            byte[] bytes = Convert.FromBase64String(base64);
            repo.UploadStudents(bytes);
        }

        [HttpGet("generatecsv")]
        public IActionResult GenerateCSV(int amount)
        {
            var repo = new StudentRepository(_connectionString);
            string csv = repo.GenerateCsv();
            byte[] csvBytes = Encoding.UTF8.GetBytes(csv);
            return File(csvBytes, "text/csv", $"Demo.csv");

        }

        [HttpPost("addStudent")]
        public void AddStudent(StudentView studentView)
        {
            var repo = new StudentRepository(_connectionString);
            repo.AddStudent(studentView);
            //try
            //{
            //    var repo = new StudentRepository(_connectionString);
            //    repo.AddStudent(studentView);
            //    return Ok(); // or return CreatedAtAction(...) to return 201
            //}
            //catch (Exception ex)
            //{
            //    return BadRequest(ex.Message); // Return meaningful error messages
            //}
        }

        [HttpPost("addEditMark")]
        public void AddEditMark(AddEditMarkViewModel vm)
        {
            var repo = new StudentRepository(_connectionString);
            repo.AddEditMark(vm.Term, vm.StudentId, vm.Accuracy, vm.Fluency, vm.Notes, vm.Action);
        }

        [HttpPost("editClass")]
        public void EditClass(List<EditClass> editClasses)
        {
            var repo = new StudentRepository(_connectionString);
            repo.EditClass(editClasses);
        }

        [HttpPost("addTask")]
        public void AddTask(AddTaskViewModel vm)
        {
            var repo = new StudentRepository(_connectionString);
            repo.AddTask(vm.Id, vm.Task);
        }

        [HttpPost("updateYear")]
        public void UpdateYear(string yearName)
        {
            var repo = new StudentRepository(_connectionString);
            repo.UpdateYear(yearName);
        }

        [HttpPost("addTutor")]
        public void AddTutor(string tutorName)
        {
            var repo = new StudentRepository(_connectionString);
            repo.AddTutor(tutorName);
        }

        [HttpPost("updateTutor")]
        public void UpdateTutor(TutorViewModel vm)
        {
            var repo = new StudentRepository(_connectionString);
            repo.UpdateTutor(vm.Id, vm.EditedTutor);
        }

        [HttpPost("removeTutor")]
        public void RemoveTutor(int id)
        {
            var repo = new StudentRepository(_connectionString);
            repo.RemoveTutor(id);
        }
    }
}
