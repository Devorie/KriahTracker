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
    }

    public DbSet<Year> Years { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<StudentInfoByYear> StudentInfoByYears { get; set; }
    public DbSet<User> Users { get; set; }
}