from django.contrib import admin

# UserAccount model
from .models import UserAccount


class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'is_superuser',
                    'is_staff', 'role',)
    search_fields = ('name', 'email')
    readonly_fields = ('last_login',)
    exculude = ('password',)

    list_filter = ('role',)
    fieldsets = ()



admin.site.register(UserAccount, UserAccountAdmin)
