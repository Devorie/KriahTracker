using Microsoft.EntityFrameworkCore;

namespace KriahTracker.Data;

public class KriahTrackerDataContext : DbContext
{
    private readonly string _connectionString;

    public KriahTrackerDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }

        // Add specific configurations for StudentInfoByYear
        modelBuilder.Entity<StudentInfoByYear>()
            .HasOne(s => s.TermOneTutor)
            .WithMany()
            .HasForeignKey(s => s.TermOneTutorId)
            .OnDelete(DeleteBehavior.SetNull);  // Override for TermOneTutor

        modelBuilder.Entity<StudentInfoByYear>()
            .HasOne(s => s.TermTwoTutor)
            .WithMany()
            .HasForeignKey(s => s.TermTwoTutorId)
            .OnDelete(DeleteBehavior.SetNull);  // Override for TermTwoTutor

        modelBuilder.Entity<StudentInfoByYear>()
            .HasOne(s => s.TermThreeTutor)
            .WithMany()
            .HasForeignKey(s => s.TermThreeTutorId)
            .OnDelete(DeleteBehavior.SetNull);  // Override for TermThreeTutor

        // Call base method if needed
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<Year> Years { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<StudentInfoByYear> StudentInfoByYears { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<TaskItem> Tasks { get; set; }
    public DbSet<Tutor> Tutor { get; set; }
}