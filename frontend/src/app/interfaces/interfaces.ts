// Basic user type from JWT payload
export interface SimpleUser {
    id: number;
    username: string;
  }
  
// Complete user type with all details
export interface User extends SimpleUser {
    bio: string;
    authoredPosts?: Post[];  // Optional to avoid circular reference issues
    followedBy: SimpleUser[];
    following: SimpleUser[];
}

// for posts
export interface Post {
    id: number;
    authorId: number;
    created_at: string;
    content: string;
    author: SimpleUser; // just need username and id
}
  
  // API call type made in ProfilePage
export interface ProfileData {
    username: string;
    id: number;
    bio: string;
    followedBy: SimpleUser[];
    following: SimpleUser[];
    authoredPosts: Post[];
}

export interface ProfileDataWithCurrentUser {
    currentUserID: number,
    profileData: ProfileData
}