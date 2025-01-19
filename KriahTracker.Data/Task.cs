using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KriahTracker.Data
{
    public class TaskItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string TaskName { get; set; }
        //public DateTime TaskDate { get; set; }

        public int? StudentId { get; set; }
        public string StudentName { get; set; }
        public string StudentClass { get; set; }
    }
}
