// components/AddressForm.tsx
import React, { useEffect, useState } from 'react';

interface AddressFormProps {
  name: string;
  mobile: string;
  houseNumber: string;
  area: string;
  pincode: string;
  city: string;
  state: string;
  setName: (val: string) => void;
  setMobile: (val: string) => void;
  setHouseNumber: (val: string) => void;
  setArea: (val: string) => void;
  setPincode: (val: string) => void;
  setCity: (val: string) => void;
  setState: (val: string) => void;
  errors: Record<string, string>;
}

const AddressForm: React.FC<AddressFormProps> = ({
  name,
  mobile,
  houseNumber,
  area,
  pincode,
  city,
  state,
  setName,
  setMobile,
  setHouseNumber,
  setArea,
  setPincode,
  setCity,
  setState,
  errors,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pincodeError, setPincodeError] = useState('');

  useEffect(() => {
    const fetchPincodeDetails = async () => {
      if (pincode.length === 6) {
        setIsFetching(true);
        setPincodeError('');

        try {
          const response = await fetch(
            `${import.meta.env.VITE_PINCODE_API_URL}/${pincode}`
          );
          const data = await response.json();

          if (data[0].Status === 'Success' && data[0].PostOffice) {
            const firstPostOffice = data[0].PostOffice[0];
            setCity(firstPostOffice.Block || firstPostOffice.District);
            setState(firstPostOffice.State);
          } else {
            setPincodeError('Invalid pincode or no data found');
            setCity('');
            setState('');
          }
        } catch (error) {
          console.error('Error fetching pincode details:', error);
          setPincodeError('Failed to fetch pincode details');
          setCity('');
          setState('');
        } finally {
          setIsFetching(false);
        }
      } else {
        // Clear city and state if pincode is not 6 digits
        if (city || state) {
          setCity('');
          setState('');
        }
      }
    };

    // Add debounce to avoid too many API calls
    const debounceTimer = setTimeout(() => {
      fetchPincodeDetails();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [pincode]);

  return (
    <div className="bg-white shadow rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Your Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile}</p>
          )}
        </div>

        <input
          type="text"
          placeholder="House Number"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
          className="w-full border px-4 py-2 rounded-md col-span-1 md:col-span-2"
          required
        />
        {errors.houseNumber && (
          <p className="text-red-500 text-sm col-span-2">
            {errors.houseNumber}
          </p>
        )}

        <input
          type="text"
          placeholder="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full border px-4 py-2 rounded-md col-span-1 md:col-span-2"
          required
        />
        {errors.area && (
          <p className="text-red-500 text-sm col-span-2">{errors.area}</p>
        )}

        <div>
          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ''); // Allow only numbers
              setPincode(value);
            }}
            maxLength={6}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
          {errors.pincode && (
            <p className="text-red-500 text-sm">{errors.pincode}</p>
          )}
          {pincodeError && (
            <p className="text-red-500 text-sm">{pincodeError}</p>
          )}
          {isFetching && (
            <p className="text-gray-500 text-sm">Fetching details...</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            readOnly={!isFetching && !!city}
          />
        </div>

        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            readOnly={!isFetching && !!state}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
