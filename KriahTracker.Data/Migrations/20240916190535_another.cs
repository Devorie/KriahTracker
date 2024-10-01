using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KriahTracker.Data.Migrations
{
    /// <inheritdoc />
    public partial class another : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BirthDay = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Years",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Years", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StudentInfoByYears",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    YearId = table.Column<int>(type: "int", nullable: false),
                    Class = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: true),
                    AccuracyTermOne = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FluencyTermOne = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NotesTermOne = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActionTermOne = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AccuracyTermTwo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FluencyTermTwo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NotesTermTwo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActionTermTwo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AccuracyTermThree = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FluencyTermThree = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NotesTermThree = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActionTermThree = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentInfoByYears", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentInfoByYears_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentInfoByYears_Years_YearId",
                        column: x => x.YearId,
                        principalTable: "Years",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentInfoByYears_StudentId",
                table: "StudentInfoByYears",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentInfoByYears_YearId",
                table: "StudentInfoByYears",
                column: "YearId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentInfoByYears");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Years");
        }
    }
}
