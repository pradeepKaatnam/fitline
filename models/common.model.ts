export interface UserInfo {
  firstName: string;
  lastName: string;
  communityInfo: CommunityInfo;
}

export interface CommunityInfo {
  enrollments: [
    {
      communityId: string;
      programId: string;
    }
  ];
  myCommunitites: Array<string>;
}
