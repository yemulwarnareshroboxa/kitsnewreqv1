import { Component, OnInit, VERSION } from '@angular/core';
import { CrosService } from '../cros.service';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { MessageService } from 'primeng/api';
import { takeLast } from 'rxjs';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css']
})
export class AddSiteComponent {
  countries: any;
  states: any;
  stateenable: boolean | undefined;
  districtEnable: boolean | undefined;
  data: any;
  createdName: any;
  changedName: any;
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  private capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  investigate = ['Principal Investigator', 'Sub-Investigator', 'Study Coordinator']
  public isEdit: boolean = false;
  public id: any = '';
  getData: any;
  myData: { text: any; value: any; }[] = [];
  mobile: any;
  investigatorForm: any;
  investigatorFormedit: any;
  notifierEmails: [] = []
  view: boolean = false;
  table: boolean = false;
  tableE: boolean = false;
  constructor(private _cro: CrosService,
    private _activatedRoute: ActivatedRoute, private admin: AdminService,
    private fb: FormBuilder, private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {


       
        this.isEdit = true;
        this.id = data.id;
        _cro.getSiteById(data.id).subscribe((data: any) => {
          this.data = data
          this.getUser()
          this.siteForm.patchValue(data);
          this.notifierEmails = data.notifier_emails
          if (this.notifierEmails.length > 0) {
            this.tableE = true
          }

          this.setContactFormValues(this.notifierEmails)
          this.getData = data
          this.siteForm.controls['site_data_code'].disable();
          // this.siteForm.controls['site_data_name'].disable();
          // this.siteForm.controls['legal_site_data_name'].disable();
          // this.siteForm.controls['email'].disable();
        });
      }
      if (data.val == 'view') {
        this.view = true
        this.siteForm.disable()

      }
      else {

      }
    });


    this.investigatorForm = this.formBuilder.group({
      investigator: this.formBuilder.array([])
    });
    this.investigatorFormedit = this.formBuilder.group({
      investigatoredit: this.formBuilder.array([])
    });

  }

  public siteForm: FormGroup = new FormGroup({
    site_data_code: new FormControl("", [Validators.required]),
    site_data_name: new FormControl("", [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]),
    legal_site_data_name: new FormControl("", [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]),
    address_1: new FormControl("", [Validators.required]),
    address_2: new FormControl(""),

    city: new FormControl("", [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]),
    district: new FormControl("", Validators.pattern(/^[A-Za-z ]+$/)),
    region: new FormControl("", [Validators.required]),
    zip_code: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    office_telephone: new FormControl(""),
    extension: new FormControl(""),
    website: new FormControl(''),
    mobile_telephone: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    email: new FormControl(''),
    investigator_name: new FormControl(''),
    investigator_email: new FormControl(''),
    sub_investigator_name: new FormControl(''),
    sub_investigator_email: new FormControl(''),
    coordinator_name: new FormControl(''),
    coordinator_email: new FormControl(''),

  });
  getStatesObservable$ = null;
  ngOnInit(): void {

    this.countries = this.dataService.getCountries();
    this.siteForm.get('country')?.valueChanges.subscribe(country => {

      this.getStatesForCountry(country);
      this.stateenable = true
    });
    this.siteForm.get('region')?.valueChanges.subscribe(country => {

      // this.getStatesForCountry(country);
      this.districtEnable = true
    });
  }
  getStatesForCountry(country: any) {
    const payload = {
      country: country
    }

    const getStatesObservable$ = this.dataService.getAllStatesAPI(payload).pipe(takeLast(1));;
    getStatesObservable$.subscribe((res: any) => {
      console.log(res)
      if (res && res.body && res.body.states) {
        this.states = this.dataService.getStates(res.body.states);
        // this.addToStatesList(res.body.states, country);
      }

    });

  }
  getUser() {
    this.admin.getUser().subscribe((data: any) => {
      data.filter((val:any) => {
        if (val.user_id === this.data.created_by) { 
          this.createdName = val.first_name + ' ' + val.last_name 
        }
       if (val.user_id === this.data.changed_by) {        
          this.changedName = val.first_name + ' ' + val.last_name
        }
      })
    })
  }
  get contactControls() {
    return (this.investigatorForm.get('investigator') as FormArray).controls;
  }
  setContactFormValues(contacts: any[]) {
    const contactFormArray = this.investigatorFormedit.get('investigatoredit') as FormArray;

    while (contactFormArray.length) {
      contactFormArray.removeAt(0);
    }

    this.notifierEmails.forEach((contact: any) => {
      console.log(contact)
      const editcontactsForm = this.formBuilder.group({
        first_name: [contact.first_name],
        last_name: [contact.last_name],
        email: [contact.email],
        contact: [contact.contact],
        role: [contact.role],
        editable: [contact.editable]
        // name: [contact.name],
        // email: [contact.email],
      });

      contactFormArray.push(editcontactsForm);
    });
    if (this.view === true) {
      // this.isEdit = false
      contactFormArray.controls.forEach((control) => {
        control.disable();
      });

      this.investigatorFormedit.disable();
    }
  }
  investigatorCreate() {
    return this.formBuilder.group({
      role: [''],
      first_name: [''],
      last_name: [''],
      email: [''],
      contact: [''],
      editable: ['true']

    });
  }
  investigatorCreatee() {
    return this.formBuilder.group({
      role: [''],
      first_name: [''],
      last_name: [''],
      email: [''],
      contact: [''],
      editable: ['']

    });
  }


  addInvestigators() {
    this.table = true
    const investigators = this.investigatorForm.get('investigator') as FormArray;
    investigators.push(this.investigatorCreate());
  }
  addInvestigatorse() {
    this.tableE = true
    const investigators = this.investigatorFormedit.get('investigatoredit') as FormArray;
    investigators.push(this.investigatorCreatee());
  }

  emailDomainValidator(control: FormControl): ValidationErrors | null {
    const email = control.value;
    if (email && email.indexOf('@') !== -1) {
      const [_, domain] = email.split('@');
      if (!['.com'].includes(domain)) {
        return { invalidDomain: true };
      }
    }
    return null; // Return null for valid email format
  }
  shouldShowRequired(controlName: string): boolean {
    const control = this.siteForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }

  shouldShowLengthError(controlName: any): boolean {
    const control = this.siteForm.get(controlName);
    return control?.invalid && (control?.errors?.['minlength'] || control?.errors?.['maxlength']) && (control?.dirty || control?.touched) || false;
  }
  shouldShowPatternError(controlName: string): boolean {
    const control = this.siteForm.get(controlName);
    return control?.touched && control?.errors?.['pattern'];
  }
  shouldShowUrlError(controlName: string): boolean {
    const control = this.siteForm.get(controlName);
    return !!control?.hasError('pattern') && !!control?.value && (control?.dirty || control?.touched);
  }

  removeSite(j: number) {
    this.investigatorForm.get('investigator').removeAt(j);
  }
  removeeditSite(j: number) {
    this.investigatorFormedit.get('investigatoredit').removeAt(j);
  }

  reset() {
    if (this.isEdit === true) {
      window.location.reload()
    }
    else {
      this.siteForm.reset()
    }
  }
  toTitleCase(str: string): string {

    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }
  submit() {

    // this.siteForm.controls['site_data_name'].setValue(this.capitalizeFirstLetter(this.siteForm.controls['site_data_name'].value));
    // this.siteForm.controls['legal_site_data_name'].setValue(this.capitalizeFirstLetter(this.siteForm.controls['legal_site_data_name'].value));

    if (this.siteForm.controls['site_data_name'].value) {
      this.siteForm.controls['site_data_name'].setValue(this.toTitleCase(this.siteForm.controls['site_data_name'].value));
    }
    if (this.siteForm.controls['legal_site_data_name'].value) {
      this.siteForm.controls['legal_site_data_name'].setValue(this.toTitleCase(this.siteForm.controls['legal_site_data_name'].value));
    }
    if (this.siteForm.controls['address_1'].value) {
      this.siteForm.controls['address_1'].setValue(this.toTitleCase(this.siteForm.controls['address_1'].value));
    }
    if (this.siteForm.controls['address_2'].value) {
      this.siteForm.controls['address_2'].setValue(this.toTitleCase(this.siteForm.controls['address_2'].value));
    }
    if (this.siteForm.controls['city'].value) {

      this.siteForm.controls['city'].setValue(this.toTitleCase(this.siteForm.controls['city'].value));

    }
    if (this.siteForm.controls['district'].value) {

      this.siteForm.controls['district'].setValue(this.toTitleCase(this.siteForm.controls['district'].value));

    }
    if (this.siteForm.controls['mobile_telephone'].value === '' || this.siteForm.controls['mobile_telephone'].value === null) {
      this.mobile = ''
    }
    else {
      this.mobile = this.siteForm.controls['mobile_telephone'].value.toString()
    }


    if (this.siteForm.invalid) {
      // Mark all form controls as touched to trigger validation
      Object.keys(this.siteForm.controls).forEach(key => {
        this.siteForm.get(key)?.markAsTouched();
      });
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill All Mandatory Fields' });

    }

    else {
      const obj: any = {
        "site_data_code": this.siteForm.controls['site_data_code'].value,
        "site_data_name": this.siteForm.controls['site_data_name'].value,
        "legal_site_data_name": this.siteForm.controls['legal_site_data_name'].value,
        "address_1": this.siteForm.controls['address_1'].value,
        "address_2": this.siteForm.controls['address_2'].value,

        "city": this.siteForm.controls['city'].value,
        "district": this.siteForm.controls['district'].value,
        "region": this.siteForm.controls['region'].value,
        "zip_code": this.siteForm.controls['zip_code'].value,
        "country": this.siteForm.controls['country'].value,
        "office_telephone": this.siteForm.controls['office_telephone'].value,
        "mobile_telephone": this.mobile,
        "extension": this.siteForm.controls['extension'].value,
        "website": this.siteForm.controls['website'].value,
        "email": this.siteForm.controls['email'].value,
        "user_id": sessionStorage.getItem('userid'),




      }
      if (this.isEdit) {
        obj.site_id = this.id
        const trimmedContactse = this.investigatorFormedit.value.investigatoredit.map((contact: any) => {
          return {
            ...contact,
            email: contact.email.trim(),
            editable: 'true'
          };
        });
        obj.notifier_emails = trimmedContactse




        this._cro.updateSiteDetails(obj).subscribe(
          (data: any) => {
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Site Details Updated Successfully' });
            }, 1000);

            this.router.navigate(['/home/cro/siteGrid'])
          },
          (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
          }
        );
      }
      else {


        const trimmedContacts = this.investigatorForm.value.investigator.map((contact: any) => {
          return {
            ...contact,
            email: contact.email.trim()
          };
        });


        obj.notifier_emails = trimmedContacts


        // obj.email = this.siteForm.controls['uemail'].value,
        // obj.status = 'active',
        // obj.password = this.siteForm.controls['password'].value,
        // obj.first_name = this.siteForm.controls['first_name'].value,
        // obj.role = 'CRA',
        this._cro.CreateSiteDetails(obj).subscribe(
          (data: any) => {
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Site Details Added Successfully' });
            }, 1000);

            this.router.navigate(['/home/cro/siteGrid'])
          },
          (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.error });


          }
        )
      }

    }
  }
  validateMobileNumber(input: any, phone: any) {
    let inputValue = input.value.trim();

    // Remove non-numeric characters
    let numericValue = inputValue.replace(/\D/g, '');

    if (phone === 'mobile') {
      if (numericValue.length > 20) {
        numericValue = numericValue.slice(0, 20);
      }
    }
    input.value = numericValue;

  }

}


