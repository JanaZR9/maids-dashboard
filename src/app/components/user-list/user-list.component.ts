import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent  {
  users: User[] = [];
  currentPage = 1;
  searchTerm: any;
  isLoading = false;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.fetchUsers();
    });
  }

  fetchUsers() {
    this.isLoading = true;
    this.userService.getUsers(this.currentPage, this.searchTerm).subscribe(
      users => {
        if (!this.searchTerm) {
          this.users = users.data;
        } else {
          this.users = this.users.filter(item => item.id === this.searchTerm);
        }
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching users:', error)
        this.isLoading = false;
      }
    );
  }
  

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.users = []; 
    this.fetchUsers();
  }
  

  onSearchChanged(value: number) {
    this.searchTerm = value;
    this.fetchUsers();
  }

  fetchUserDetails(id: number) {
    this.userService.getUserDetails(id).subscribe(
      user => console.log(user),
      error => console.error('Error fetching user details:', error)
    );
  }
  
}
