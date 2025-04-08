import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfilesService } from '../../services/profiles.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobseeker-profile',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './jobseeker-profile.component.html',
  styleUrl: './jobseeker-profile.component.css'
})


export class JobseekerProfileComponent implements OnInit {
  profileForm!: FormGroup;
  skillCategories: any[] = [];
  skills: any[] = [];
  filteredSkills: any[][] = [];  // Dynamic filtered skills per row

  constructor(
    private fb: FormBuilder,
    private profileService: ProfilesService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      
      name: ['', Validators.required],
      phone: [''],
      location: [''],
      portfolioLink: [''],
      skills: this.fb.array([])
    });

    this.loadSkillCategories();
    this.loadAllSkills();
  }

  get skillsFormArray(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }

  addSkill(): void {
    const skillGroup = this.fb.group({
      category: ['', Validators.required],
      skill: ['', Validators.required],
      level: ['', Validators.required],
      years: ['', [Validators.required, Validators.min(0)]]
    });

    this.skillsFormArray.push(skillGroup);
    this.filteredSkills.push([]); // Initialize empty filtered list for this skill group
  }

  removeSkill(index: number): void {
    this.skillsFormArray.removeAt(index);
    this.filteredSkills.splice(index, 1);
  }

  loadSkillCategories(): void {
    this.profileService.getSkillCategories().subscribe(data => {
      this.skillCategories = data;
    });
  }

  loadAllSkills(): void {
    this.profileService.getAllSkills().subscribe(data => {
      this.skills = data;
    });
  }

  updateSkillOptions(index: number): void {
    const categoryId = this.skillsFormArray.at(index).get('category')?.value;
    this.filteredSkills[index] = this.skills.filter(skill => skill.category_id === +categoryId);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;

      const profilePayload = {
        user: {
          name: formData.name,

        },
        profile: {
          phone: formData.phone,
          location: formData.location,
          portfolio_link: formData.portfolioLink
        },
        skills: formData.skills.map((s: any) => ({
          skill_id: s.skill,
          skill_level: s.level,
          years_of_experience: s.years
        }))
      };

      this.profileService.saveJobSeekerProfile(profilePayload).subscribe(response => {
        console.log('Profile saved successfully', response);
      });
    }
  }
}
