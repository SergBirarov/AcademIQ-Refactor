using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AcademIQ_backend.Migrations
{
    /// <inheritdoc />
    public partial class FixRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActiveStudentCourses_Students_StudentId",
                table: "ActiveStudentCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_CoursesOnAir_Students_StudentId",
                table: "CoursesOnAir");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Courses_CoursesCourseId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Roles_Role_Code1",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_Role_Code1",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Students_CoursesCourseId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Role_Code1",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CoursesCourseId",
                table: "Students");

            migrationBuilder.RenameColumn(
                name: "StudentId",
                table: "CoursesOnAir",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "StudentId",
                table: "ActiveStudentCourses",
                newName: "Id");

            migrationBuilder.AlterColumn<short>(
                name: "Role_Code",
                table: "Users",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Enrollment",
                table: "Students",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AlterColumn<short>(
                name: "Role_Code",
                table: "Staff",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<short>(
                name: "Role_Code",
                table: "Roles",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<DateTime>(
                name: "EmploymentStartDate",
                table: "Instructors",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Role_Code",
                table: "Users",
                column: "Role_Code");

            migrationBuilder.AddForeignKey(
                name: "FK_ActiveStudentCourses_Students_Id",
                table: "ActiveStudentCourses",
                column: "Id",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CoursesOnAir_Students_Id",
                table: "CoursesOnAir",
                column: "Id",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Roles_Role_Code",
                table: "Users",
                column: "Role_Code",
                principalTable: "Roles",
                principalColumn: "Role_Code",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActiveStudentCourses_Students_Id",
                table: "ActiveStudentCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_CoursesOnAir_Students_Id",
                table: "CoursesOnAir");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Roles_Role_Code",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_Role_Code",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "CoursesOnAir",
                newName: "StudentId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ActiveStudentCourses",
                newName: "StudentId");

            migrationBuilder.AlterColumn<int>(
                name: "Role_Code",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(short),
                oldType: "smallint");

            migrationBuilder.AddColumn<int>(
                name: "Role_Code1",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<DateOnly>(
                name: "Enrollment",
                table: "Students",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<int>(
                name: "CoursesCourseId",
                table: "Students",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Role_Code",
                table: "Staff",
                type: "int",
                nullable: false,
                oldClrType: typeof(short),
                oldType: "smallint");

            migrationBuilder.AlterColumn<int>(
                name: "Role_Code",
                table: "Roles",
                type: "int",
                nullable: false,
                oldClrType: typeof(short),
                oldType: "smallint")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "EmploymentStartDate",
                table: "Instructors",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Role_Code1",
                table: "Users",
                column: "Role_Code1");

            migrationBuilder.CreateIndex(
                name: "IX_Students_CoursesCourseId",
                table: "Students",
                column: "CoursesCourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActiveStudentCourses_Students_StudentId",
                table: "ActiveStudentCourses",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CoursesOnAir_Students_StudentId",
                table: "CoursesOnAir",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Courses_CoursesCourseId",
                table: "Students",
                column: "CoursesCourseId",
                principalTable: "Courses",
                principalColumn: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Roles_Role_Code1",
                table: "Users",
                column: "Role_Code1",
                principalTable: "Roles",
                principalColumn: "Role_Code");
        }
    }
}
