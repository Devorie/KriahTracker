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
        public List<StudentView> GetStudents()
        {
            var repo = new StudentRepository(_connectionString);
            return repo.GetAll();

        }

        [HttpGet("getInfo")]
        public List<StudentInfoByYear> GetInfo(int id)
        {
            var repo = new StudentRepository(_connectionString);
            return repo.GetInfo(id);

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

        [HttpPost("addMark")]
        public void AddMark(AddMarkViewModel vm)
        {
            var repo = new StudentRepository(_connectionString);
            repo.AddMark(vm.Term, vm.StudentId, vm.Accuracy, vm.Fluency, vm.Notes, vm.Action);
        }

        [HttpPost("updateYear")]
        public void UpdateYear(string yearName)
        {
            var repo = new StudentRepository(_connectionString);
            repo.UpdateYear(yearName);
        }
    }
}
