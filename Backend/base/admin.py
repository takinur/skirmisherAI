from django.contrib import admin

from .models import Blog, CandidateProfile, Contact, EmployerProfile, Invitation, JobApplication, Newsletter, UserAccount, Vacancy


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


class EmployerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'company_name', 'slogan',
                    'website', 'phone', 'location', 'created_at')

    search_fields = ('user', 'company_name', 'website',
                     'phone', 'location',)

    # exculude = ('password', 'last_login', 'updated_at',)

    list_filter = ('company_name', 'location', 'phone',)
    fieldsets = (
        (None, {
            'fields': ('company_name', 'location', 'phone', 'size', 'website', 'user')
        }),
        ('Further Details', {
            'fields': ('slogan', 'logo', 'about')
        }
        ),
    )


class CandidateProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'email', 'phone',
                    'website', 'designation', 'location', 'resume_file', 'created_at')

    search_fields = ('user', 'email', 'location',
                     'phone', 'designation',)

    list_filter = ('location', 'designation', 'created_at',)
    fieldsets = (
        (None, {
            'fields': ('resume_file', 'location', 'designation', 'website', 'user')
        }),

    )


class VacancyAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'level', 'salary', 'benefits',
                    'qualifications', 'work_location', 'employer', 'created_at')

    search_fields = ('title', 'type', 'qualifications',
                     'work_location', 'employer',)

    list_filter = ('type', 'work_location', 'employer', 'created_at',)
    fieldsets = (
        (None, {
            'fields': ('title', 'level', 'salary', 'qualifications', 'employer')
        }),
        ('Additional Details', {
            'fields': ('work_location', 'type', 'benefits', 'description')
        }
        ),
    )


class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('vacancy', 'candidate', 'status',
                    'skill_score', 'total_score', 'created_at')

    search_fields = ('vacancy', 'candidate', 'status',
                     'created_at',)

    list_filter = ('vacancy', 'status', 'created_at',)
    fieldsets = (
        (None, {
            'fields': ('vacancy', 'candidate', 'status', 'skill_score', 'total_score', )
        }),
    )


class VacancyAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'level', 'salary', 'benefits',
                    'qualifications', 'work_location', 'employer', 'created_at')

    search_fields = ('title', 'type', 'qualifications',
                     'work_location', 'employer',)

    list_filter = ('type', 'work_location', 'employer', 'created_at',)
    fieldsets = (
        (None, {
            'fields': ('title', 'level', 'salary', 'qualifications', 'employer')
        }),
        ('Additional Details', {
            'fields': ('work_location', 'type', 'benefits', 'description')
        }
        ),
    )


class InvitationAdmin(admin.ModelAdmin):
    list_display = ('job_application', 'meet_url',
                    'schedule', 'remarks', 'created_at')

    search_fields = ('job_application', 'meet_url', 'schedule',
                     'created_at',)

    list_filter = ('schedule', 'created_at',)
    fieldsets = (
        (None, {
            'fields': ('job_application', 'meet_url', 'schedule', 'remarks',)
        }),
    )


class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'tags', 'author', 'slug',
                    'description', 'created_at')

    search_fields = ('title', 'tags', 'author',
                     'slug', )

    list_filter = ('tags', 'author', 'created_at',)
    fieldsets = (
        (None, {
            'fields': ('title', 'tags', 'author', 'slug',
                       'description',)
        }),
    )


class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject',
                    'message', 'created_at')

    search_fields = ('name', 'email', 'subject',
                     'message',)

    list_filter = ('subject', 'created_at',)
    fieldsets = (
        (None, {
            'fields': ('name', 'email', 'subject', 'message',)
        }),
    )


class NewsletterAdmin(admin.ModelAdmin):
    list_display = ('email', 'created_at')

    search_fields = ('email',)

    list_filter = ('created_at',)


admin.site.register(UserAccount, UserAccountAdmin)
admin.site.register(EmployerProfile, EmployerProfileAdmin)
admin.site.register(CandidateProfile, CandidateProfileAdmin)
admin.site.register(Vacancy, VacancyAdmin)
admin.site.register(JobApplication, ApplicationAdmin)
admin.site.register(Invitation, InvitationAdmin)
admin.site.register(Blog, BlogAdmin)
admin.site.register(Contact, ContactAdmin)
admin.site.register(Newsletter, NewsletterAdmin)
