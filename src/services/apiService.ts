import axios from 'axios';
import { TeamMember } from '../types/types';

export const fetchTeamMembers = async (params: any): Promise<TeamMember[]> => {
  try {
    const response = await axios.get(`http://192.168.1.27:5000/api/members`, {
      params
    });
    return response?.data as TeamMember[];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const updateMemberDetails = async (memberId: number, data: any): Promise<void> => {
  try {
    const response = await axios.put(`http://192.168.1.27:5000/api/members/${memberId}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      throw new Error('Failed to update member details');
    }
  } catch (error) {
    console.error('Error updating member details:', error);
    throw error;
  }
};

export const deleteMembers = async (ids: number[]): Promise<void> => {
  try {
    const response = await axios.delete(`http://192.168.1.27:5000/api/members`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ids: ids,
      },
    });
    if (response.status !== 200) {
      throw new Error('Failed to delete members');
    }
  } catch (error) {
    console.error('Error deleting members:', error);
    throw error;
  }
};
