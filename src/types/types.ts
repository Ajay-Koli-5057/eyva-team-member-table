export interface TeamMember {
    id: number;
    name: string;
    userName: string;
    avatar: string;
    isActive: boolean;
    role: string;
    email: string;
    teams: string[];
}

export interface TeamMemberRowProps {
    member: TeamMember;
    selected: boolean;
    onSelect: (id: number) => void;
    onSingleDelete: () => void;
    onEdit: () => void;
}