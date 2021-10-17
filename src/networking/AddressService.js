/* eslint-disable linebreak-style */
const setAddress = (address) => {
  localStorage.setItem('address', JSON.stringify(address));
};
const removeAddress = () => {
  localStorage.removeItem('address');
};

const getAddress = () => JSON.parse(localStorage.getItem('address'));

const AddressService = {
  setAddress,
  removeAddress,
  getAddress,
};

export default AddressService;
