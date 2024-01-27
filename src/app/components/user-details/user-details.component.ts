import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  user: User | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    const userId = +this.route.snapshot.params['id'];
    this.userService.getUserDetails(userId).subscribe(
      user => this.user = user.data,
      error => console.error('Error fetching user details:', error)
    );
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
