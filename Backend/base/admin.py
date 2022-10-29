from django.contrib import admin

# UserAccount model
from .models import EmployerProfile, UserAccount


class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'is_superuser',
                    'is_staff', 'role',)
    search_fields = ('name', 'email')
    readonly_fields = ('last_login',)
    exculude = ('password',)

    list_filter = ('role',)
    fieldsets = (
        (None, {
            'fields': ('name', 'email', 'password', 'role', 'is_superuser')
        }),
        ('Additional Options', {
            'fields': ('is_staff', 'is_active')
        }
        ),
    )

    ('name', 'email', 'is_superuser',
     'is_staff', 'role', 'is_active',)


class EmployerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'company_name', 'slogan',
                    'website', 'phone', 'location', 'created_at')
    search_fields = ('user', 'company_name', 'website',
                     'phone', 'location',)

    exculude = ('password', 'last_login', 'updated_at',)

    list_filter = ('user',)
    fieldsets = ()


admin.site.register(UserAccount, UserAccountAdmin)
admin.site.register(EmployerProfile, EmployerProfileAdmin)
