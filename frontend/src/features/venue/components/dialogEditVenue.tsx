import { Text, Dialog, Button, Flex, TextField, Strong } from "@radix-ui/themes";
import { patchVenue } from "@/services/venue.service";
import { useState } from "react";

type DialogEditVenueProps = {
    getVenueData: Function;
    venue_Id: string;
    venue_name: string;
    capacity: string;
    address: string;
    district: string;
    province: string;
    postal_code: string;
};

const DialogEditVenue = ({
    getVenueData,
    venue_Id,
    venue_name,
    capacity,
    address,
    district,
    province,
    postal_code
}: DialogEditVenueProps) => {
    const [patchVenueName, setPatchVenueName] = useState(venue_name);
    const [patchCapacity, setPatchCapacity] = useState(capacity);
    const [patchAddress, setPatchAddress] = useState(address);
    const [patchDistrict, setPatchDistrict] = useState(district);
    const [patchProvince, setPatchProvince] = useState(province);
    const [patchPostalCode, setPatchPostalCode] = useState(postal_code);
    
    const [errors, setErrors] = useState({
        venueName: "",
        capacity: "",
        address: "",
        district: "",
        province: "",
        postalCode: ""
    });

    const handleUpdateVenue = async () => {
        let valid = true;
        const newErrors: any = {};

        if (!patchVenueName) {
            newErrors.venueName = "Please enter a venue name.";
            valid = false;
        }

        if (!patchCapacity || isNaN(Number(patchCapacity)) || Number(patchCapacity) <= 0) {
            newErrors.capacity = "Please enter a valid capacity.";
            valid = false;
        }

        if (!patchAddress) {
            newErrors.address = "Please enter the venue address.";
            valid = false;
        }

        if (!patchDistrict) {
            newErrors.district = "Please enter the venue district.";
            valid = false;
        }

        if (!patchProvince) {
            newErrors.province = "Please enter the venue province.";
            valid = false;
        }

        if (!patchPostalCode) {
            newErrors.postalCode = "Please enter the postal code.";
            valid = false;
        }

        setErrors(newErrors);

        if (!valid) return;

        try {
            const response = await patchVenue({
                venue_Id: venue_Id,
                venue_name: patchVenueName,
                capacity: patchCapacity,
                address: patchAddress,
                district: patchDistrict,
                province: patchProvince,
                postal_code: patchPostalCode,
            });

            if (response.statusCode === 200) {
                setPatchVenueName("");
                setPatchCapacity("");
                setPatchAddress("");
                setPatchDistrict("");
                setPatchProvince("");
                setPatchPostalCode("");
                getVenueData(); // Refresh the data
            } else {
                alert(`Unexpected error: ${response.message}`);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error updating venue:", error.message);
                alert("Failed to update venue. Please try again.");
            } else {
                console.error("Unknown error:", error);
                alert("An unexpected error occurred.");
            }
        }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button size="1" color="orange" variant="soft">
                    Edit
                </Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Edit Venue</Dialog.Title>
                <Flex direction="column" gap="3">
                    <label>
                        <Text size="2">
                            <Strong>Id:</Strong> {venue_Id}
                        </Text>
                    </label>
                    <label>
                        <Text size="2">
                            <Strong>Current Venue Name:</Strong> {venue_name}
                        </Text>
                    </label>
                    <label>
                        <Text size="2">
                            <Strong>Current Capacity:</Strong> {capacity}
                        </Text>
                    </label>
                    <label>
                        <Text size="2">
                            <Strong>Current Address:</Strong> {address}
                        </Text>
                    </label>
                    <label>
                        <Text size="2">
                            <Strong>Current District:</Strong> {district}
                        </Text>
                    </label>
                    <label>
                        <Text size="2">
                            <Strong>Current Province:</Strong> {province}
                        </Text>
                    </label>
                    <label>
                        <Text size="2">
                            <Strong>Current Postal Code:</Strong> {postal_code}
                        </Text>
                    </label>

                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            New Venue Name
                        </Text>
                        <TextField.Root
                            defaultValue={venue_name}
                            placeholder="Enter the new venue name"
                            onChange={(event) => setPatchVenueName(event.target.value)}
                        />
                        {errors.venueName && <Text size="2" color="red">{errors.venueName}</Text>}
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            New Capacity
                        </Text>
                        <TextField.Root
                            defaultValue={capacity}
                            placeholder="Enter the new capacity"
                            onChange={(event) => setPatchCapacity(event.target.value)}
                        />
                        {errors.capacity && <Text size="2" color="red">{errors.capacity}</Text>}
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            New Address
                        </Text>
                        <TextField.Root
                            defaultValue={address}
                            placeholder="Enter the new address"
                            onChange={(event) => setPatchAddress(event.target.value)}
                        />
                        {errors.address && <Text size="2" color="red">{errors.address}</Text>}
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            New District
                        </Text>
                        <TextField.Root
                            defaultValue={district}
                            placeholder="Enter the new district"
                            onChange={(event) => setPatchDistrict(event.target.value)}
                        />
                        {errors.district && <Text size="2" color="red">{errors.district}</Text>}
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            New Province
                        </Text>
                        <TextField.Root
                            defaultValue={province}
                            placeholder="Enter the new province"
                            onChange={(event) => setPatchProvince(event.target.value)}
                        />
                        {errors.province && <Text size="2" color="red">{errors.province}</Text>}
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            New Postal Code
                        </Text>
                        <TextField.Root
                            defaultValue={postal_code}
                            placeholder="Enter the new postal code"
                            onChange={(event) => setPatchPostalCode(event.target.value)}
                        />
                        {errors.postalCode && <Text size="2" color="red">{errors.postalCode}</Text>}
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={handleUpdateVenue}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default DialogEditVenue;
