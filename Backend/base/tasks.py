from django_q.tasks import async_task

from Backend.base.models import JobApplication


def calculate_score(self, profile, vacancy):
    '''
       Helper Method to Calculate score
    '''

    # Required Skills and format
    req_skills = vacancy.qualifications.split(',')
    req_skills = [skill.lower().replace(' ', '') for skill in req_skills]

    # Collect Candidate skills and format them
    cand_skills = profile.skills.all().values_list('name', flat=True)
    cand_skills = [skill.lower() for skill in cand_skills]

    # Check how many skills match
    matched_skills = set(req_skills).intersection(cand_skills)

    # Calculate percentage of matched skills
    skill_score = (len(matched_skills) / len(req_skills)) * 100

    # Raw text and Job Title
    text = profile.resume_raw_text
    label = vacancy.title
    # Call NLP Model to get score
    # nlp_score = resumeScreener.wrapper(text, label)
    nlp_score = 0.0
    # Calculate final score
    final_score = 0

    # Skill Score weightage 40% of total score
    final_score += (skill_score * 0.4)
    # NLP Score weightage 60% of total score
    final_score += (nlp_score * 0.6)

    # Update score in job application

    return final_score, skill_score, nlp_score


# Score Calculator
def task_calculate_score(job_application_id):

    application = JobApplication.objects.select_related(
        'candidate', 'vacancy').get(id=job_application_id)

    profile = application.candidate
    vacancy = application.vacancy

    score = calculate_score(profile, vacancy)

    # Update score in job application
    application.total_score = score[0]
    application.skill_score = score[1]
    application.nlp_score = score[2]
    application.save()
