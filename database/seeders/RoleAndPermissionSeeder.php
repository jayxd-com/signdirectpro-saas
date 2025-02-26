<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create permissions first
        $permissions = [
            'create admin', 'edit admin', 'view admin', 'delete admin',
            'create business', 'edit business', 'view business', 'delete business',
            'create membership', 'edit membership', 'view membership', 'delete membership',
            'create account', 'edit account', 'view account', 'delete account',
            'create blog', 'edit blog', 'view blog', 'delete blog',
            'create newsletter', 'edit newsletter', 'view newsletter', 'delete newsletter',
            'create ticket', 'edit ticket', 'view ticket', 'delete ticket',
        ];

        $this->command->info("\n======================================");
        $this->command->info("Permissions");
        $this->command->info("======================================");

        foreach ($permissions as $permission) {
            // Check if permission already exists, otherwise create it
            Permission::firstOrCreate(['name' => $permission]);
            $this->command->info("- $permission created or already exists.");
        }

        // Create roles
        $roles = [
            'super-admin', // sudo user
            'admin', // Can do everything except managing other admins
            'manager', // Can manage members, newsletters etc but can not do accounting
            'editor', // Can edit blogs, newsletters etc
            'support', // Can manage helpdesk
            'member', // End Members
        ];

        $this->command->info("\n======================================");
        $this->command->info("Roles");
        $this->command->info("======================================");

        foreach ($roles as $role) {
            // Check if role already exists, otherwise create it
            $existingRole = Role::where('name', $role)->first();
            if (!$existingRole) {
                Role::create(['name' => $role]);
                $this->command->info("- $role created");
            } else {
                $this->command->info("- $role already exists.");
            }
        }

        // Assign permissions to roles
        $this->command->info("\n======================================");
        $this->command->info("Assigning Permissions to Roles");
        $this->command->info("======================================");

        // Super Admin - all permissions
        $superAdmin = Role::findByName('super-admin');
        $superAdmin->givePermissionTo(Permission::all());
        $this->command->info("- All permissions assigned to super-admin.");

        // Admin - Specific permissions
        $admin = Role::findByName('admin');
        $admin->givePermissionTo([
            'create admin', 'edit admin', 'view admin', 'delete admin',
            'create business', 'edit business', 'view business', 'delete business',
            'create membership', 'edit membership', 'view membership', 'delete membership',
            'create account', 'edit account', 'view account', 'delete account',
            'create blog', 'edit blog', 'view blog', 'delete blog',
            'create newsletter', 'edit newsletter', 'view newsletter', 'delete newsletter',
            'create ticket', 'edit ticket', 'view ticket', 'delete ticket',
        ]);
        $this->command->info("- Specific permissions assigned to admin.");

        // Manager - Some permissions
        $manager = Role::findByName('manager');
        $manager->givePermissionTo([
            'create business', 'edit business', 'view business', 'delete business',
            'create membership', 'edit membership', 'view membership', 'delete membership',
            'create account', 'edit account', 'view account', 'delete account',
            'create blog', 'edit blog', 'view blog', 'delete blog',
            'create newsletter', 'edit newsletter', 'view newsletter', 'delete newsletter',
            'view ticket',
        ]);
        $this->command->info("- Specific permissions assigned to manager.");

        // Editor - Blog & Newsletter permissions
        $editor = Role::findByName('editor');
        $editor->givePermissionTo([
            'create blog', 'edit blog', 'view blog', 'delete blog',
            'create newsletter', 'edit newsletter', 'view newsletter', 'delete newsletter',
        ]);
        $this->command->info("- Specific permissions assigned to editor.");

        // Support - Ticket permissions
        $support = Role::findByName('support');
        $support->givePermissionTo([
            'create ticket', 'edit ticket', 'view ticket', 'delete ticket',
        ]);
        $this->command->info("- Specific permissions assigned to support.");

        // Members don't need specific permissions yet
        $this->command->info("\n======================================");
        $this->command->info("Summary");
        $this->command->info("======================================");
        $this->command->info('- Roles and permissions have been created and assigned.');
    }
}
