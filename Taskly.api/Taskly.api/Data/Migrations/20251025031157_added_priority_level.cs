using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Taskly.api.data.migrations
{
    /// <inheritdoc />
    public partial class added_priority_level : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PriorityLevel",
                table: "Priorities",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriorityLevel",
                table: "Priorities");
        }
    }
}
