export interface IMemebersProps {
  communityId: string;
  navigation: any;
}

export interface IAddMemberProps extends IMemebersProps {
  onSave: () => void;
}

export interface IStudentInfo {
  fname: string;
  lname: string;
  mobile: string;
}

export interface IProgramInfo {
  id: string;
  name: string;
}
