import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import codeService from "./codeService";

const Postcode = ({addAddress}) => {
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        addAddress(fullAddress);
        codeService.closeModal();
    }

    return (
        <DaumPostcode
            onComplete={handleComplete}
            animation={true}
        />
    );
};

export default Postcode;