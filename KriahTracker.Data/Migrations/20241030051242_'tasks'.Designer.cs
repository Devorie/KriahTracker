﻿// <auto-generated />
using System;
using KriahTracker.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace KriahTracker.Data.Migrations
{
    [DbContext(typeof(KriahTrackerDataContext))]
    [Migration("20241030051242_'tasks'")]
    partial class tasks
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.17")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("KriahTracker.Data.Student", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("BirthDay")
                        .HasColumnType("datetime2");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("KriahTracker.Data.StudentInfoByYear", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AccuracyTermOne")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AccuracyTermThree")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AccuracyTermTwo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ActionTermOne")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ActionTermThree")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ActionTermTwo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Class")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FluencyTermOne")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FluencyTermThree")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FluencyTermTwo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NotesTermOne")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NotesTermThree")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NotesTermTwo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("StudentId")
                        .HasColumnType("int");

                    b.Property<int>("YearId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StudentId");

                    b.HasIndex("YearId");

                    b.ToTable("StudentInfoByYears");
                });

            modelBuilder.Entity("KriahTracker.Data.Task", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("StudentClass")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("StudentId")
                        .HasColumnType("int");

                    b.Property<string>("StudentName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TaskName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("KriahTracker.Data.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("KriahTracker.Data.Year", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Years");
                });

            modelBuilder.Entity("KriahTracker.Data.StudentInfoByYear", b =>
                {
                    b.HasOne("KriahTracker.Data.Student", null)
                        .WithMany("InfoByYear")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("KriahTracker.Data.Year", "Year")
                        .WithMany()
                        .HasForeignKey("YearId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Year");
                });

            modelBuilder.Entity("KriahTracker.Data.Student", b =>
                {
                    b.Navigation("InfoByYear");
                });
#pragma warning restore 612, 618
        }
    }
}
