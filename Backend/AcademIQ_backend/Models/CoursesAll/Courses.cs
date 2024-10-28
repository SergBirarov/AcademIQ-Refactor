using AcademIQ_backend.Models.ExamsAssignments;
using AcademIQ_backend.Models.Users;
using AcademIQ_backend.Models.LecturesEvents;
using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.CoursesAll
{
    public class Courses
    {
        [Key]
        public int CourseId { get; set; }
        public string? CourseName { get; set; }
        public bool ClassRoomRequired { get; set; }

        // Navigation Properties
        public ICollection<ActiveStudentCourses>? ActiveStudentCourses { get; set; }
        public ICollection<Assignments>? Assignments { get; set; }
        public ICollection<Lectures>? Lectures { get; set; }
        public ICollection<CoursesOnAir>? CoursesOnAir { get; set; }
        public ICollection<Exams>? Exams { get; set; }
        public Instructors? Instructor { get; set; }
        //public ICollection<Students> Students
        //{
        //    get
        //    {
        //        return ActiveStudentCourses?.Select(asc => asc.Student).ToList();
        //    }
        //}


        // Navigation Property - One-to-Many relationship with Events
        public ICollection<Event>? Event { get; set; }

        // Navigation Property - One-to-Many relationship with Exams
    }
}
