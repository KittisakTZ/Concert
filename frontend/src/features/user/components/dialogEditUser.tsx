import { Text, Dialog, Button, Flex, TextField, Strong } from "@radix-ui/themes";
import { patchUser } from "@/services/user.service"; // ฟังก์ชัน API สำหรับอัปเดตข้อมูลผู้ใช้
import { useState } from "react";

type DialogUserProps = { 
    getUsersData: Function; // ฟังก์ชันสำหรับรีเฟรชข้อมูลผู้ใช้
    user_Id: string; // รหัสผู้ใช้
    title: string; // คำนำหน้า
    fname: string; // ชื่อ
    lname: string; // นามสกุล
};

const DialogEditUser = ({ getUsersData, user_Id, title, fname, lname }: DialogUserProps) => {
    const [patchTitle, setPatchTitle] = useState(title); // จัดการคำนำหน้า
    const [patchFirstName, setPatchFirstName] = useState(fname); // จัดการชื่อ
    const [patchLastName, setPatchLastName] = useState(lname); // จัดการนามสกุล

    const handleUpdateUser = async () => {
        if (!patchFirstName || !patchLastName) {
            alert("Please fill in all required fields."); // ตรวจสอบการกรอกข้อมูล
            return;
        }

        try {
            const response = await patchUser({
                user_Id: user_Id,
                title: patchTitle,
                fname: patchFirstName,
                lname: patchLastName,
            });

            if (response.statusCode === 200) {
                setPatchTitle("");
                setPatchFirstName("");
                setPatchLastName("");
                getUsersData(); // รีเฟรชข้อมูลผู้ใช้หลังจากอัปเดต
            } else {
                alert(`Unexpected error: ${response.message}`);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user. Please try again.");
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
                <Dialog.Title>Edit User</Dialog.Title>
                <Flex direction="column" gap="3">
                    <label>
                        <Text size="2">
                            <Strong>Id:</Strong> {user_Id}
                        </Text>
                    </label>
                    <label>
                        <Text size="2">
                            <Strong>Current Name:</Strong> {title} {fname} {lname}
                        </Text>
                    </label>

                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Title
                        </Text>
                        <TextField.Root
                            value={patchTitle}
                            placeholder="Enter new title"
                            onChange={(event) => setPatchTitle(event.target.value)}
                        />
                    </label>

                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            First Name
                        </Text>
                        <TextField.Root
                            value={patchFirstName}
                            placeholder="Enter new first name"
                            onChange={(event) => setPatchFirstName(event.target.value)}
                        />
                    </label>

                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Last Name
                        </Text>
                        <TextField.Root
                            value={patchLastName}
                            placeholder="Enter new last name"
                            onChange={(event) => setPatchLastName(event.target.value)}
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
                        <Button onClick={handleUpdateUser}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default DialogEditUser;
