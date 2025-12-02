
//generate 5 digits ramdon user id
export const generateRamdonUserId = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

//generate 5 digits ramdon hospital id
export const generateRamdonHospitalId = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const generateRamdonDoctorId = (): string => {
  return (Math.floor(10000 + Math.random() * 90000)).toString();
};

export const generateRamdonDonor = () => {
  return Math.floor(10000 + Math.random() * 9000000).toString();
};
