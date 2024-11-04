export interface Animal {
  id: string;
  name: string;
  birthDate: string;  
  hasAllergies: boolean;
  sex: {
    id: string;
    type: string;   
    symbolUrl: string;
  };
  species: {
    id: string;
    name: string;
  };
  breed: {
    id: string;
    name: string;
    species: {
      id: string;
      name: string;
    };
  };
}
