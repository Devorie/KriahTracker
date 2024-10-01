using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KriahTracker.Data
{
    public class StudentView
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDay { get; set; }
        public string Class { get; set; }
        public Year CurrentYear { get; set; }
        public List<StudentInfoByYear> InfoByYear { get; set; }

    }
}
