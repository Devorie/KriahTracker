using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KriahTracker.Data
{
    public class StudentInfoByYear
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int YearId { get; set; }
        public string Class { get; set; }
        public string AccuracyTermOne { get; set; }
        public string FluencyTermOne { get; set; }
        public string NotesTermOne { get; set; }
        public string ActionTermOne { get; set; }
        public string AccuracyTermTwo { get; set; }
        public string FluencyTermTwo { get; set; }
        public string NotesTermTwo { get; set; }
        public string ActionTermTwo { get; set; }
        public string AccuracyTermThree { get; set; }
        public string FluencyTermThree { get; set; }
        public string NotesTermThree { get; set; }
        public string ActionTermThree { get; set; }

        public Year Year { get; set; }
    }
}
