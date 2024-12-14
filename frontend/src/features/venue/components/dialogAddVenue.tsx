import { postVenue } from "@/services/venue.service"; // Assuming postVenue is an API service function
import { useState } from "react";
import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";

type DialogAddVenueProps = {
    getVenueData: Function;
};

const DialogAddVenue = ({ getVenueData }: DialogAddVenueProps) => {
    const [postVenueName, setPostVenueName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const handleCreateVenue = async () => {
        // ตรวจสอบว่าได้กรอกข้อมูลครบทุกฟิลด์
        if (!postVenueName || !capacity || !address || !district || !province || !postalCode) {
            alert("Please fill in all fields.");
            return;
        }
    
        // แปลง capacity จาก string เป็น number
        const numericCapacity = parseInt(capacity, 10);
        if (isNaN(numericCapacity) || numericCapacity <= 0) {
            alert("Please enter a valid capacity.");
            return;
        }
    
        try {
            const response = await postVenue({
                venue_name: postVenueName,
                capacity: numericCapacity, // ส่งค่า capacity ที่เป็นตัวเลข
                address,
                district,
                province,
                postal_code: postalCode,
            });
    
            if (response.statusCode === 200 || response.statusCode === 201) {
                // รีเซ็ตฟอร์มหลังจากสร้าง venue สำเร็จ
                setPostVenueName("");
                setCapacity("");
                setAddress("");
                setDistrict("");
                setProvince("");
                setPostalCode("");
                alert("Venue created successfully!");
                getVenueData(); // รีเฟรชข้อมูล
            } else {
                alert(response.message || "An error occurred while creating the venue.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while creating the venue.");
        }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button size="1">Create Venue</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Create Venue</Dialog.Title>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Venue Name
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter venue name"
                            onChange={(event) => setPostVenueName(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Capacity
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter capacity"
                            onChange={(event) => setCapacity(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Address
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter address"
                            onChange={(event) => setAddress(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            District
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter district"
                            onChange={(event) => setDistrict(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Province
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter province"
                            onChange={(event) => setProvince(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Postal Code
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter postal code"
                            onChange={(event) => setPostalCode(event.target.value)}
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={handleCreateVenue}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default DialogAddVenue;
