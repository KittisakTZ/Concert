import { postUser } from "@/services/user.service";
import { useState } from "react";
import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";

type DialogAddUserProps = {
    getUsersData: Function; // ฟังก์ชันสำหรับรีเฟรชข้อมูลผู้ใช้
};

const DialogAddUser = ({ getUsersData }: DialogAddUserProps) => {
    const [userTitle, setUserTitle] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleCreateUser = async () => {
        // ตรวจสอบช่องที่จำเป็น
        if (!userTitle || !firstName || !lastName || !userEmail || !userPassword) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            // เรียกใช้ API เพื่อเพิ่มผู้ใช้ใหม่
            const response = await postUser({
                title: userTitle,
                fname: firstName,
                lname: lastName,
                phone: userPhone,
                email: userEmail,
                password: userPassword,
            });

            if (response.statusCode === 200) {
                // ล้างค่าช่องป้อนข้อมูล
                setUserTitle("");
                setFirstName("");
                setLastName("");
                setUserPhone("");
                setUserEmail("");
                setUserPassword("");

                alert("User created successfully!");
                getUsersData(); // รีเฟรชข้อมูลผู้ใช้
            } else {
                alert(response.message || "An error occurred while creating the user.");
            }
        } catch (error) {
            alert("An error occurred while creating the user.");
        }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button size="1">Create User</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Create User</Dialog.Title>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Title
                        </Text>
                        <TextField.Root
                            placeholder="Enter title (e.g., Mr., Ms., Mrs.)"
                            value={userTitle}
                            onChange={(e) => setUserTitle(e.target.value)}
                        />
                    </label>
                </Flex>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            First Name
                        </Text>
                        <TextField.Root
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                </Flex>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Last Name
                        </Text>
                        <TextField.Root
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                </Flex>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Phone
                        </Text>
                        <TextField.Root
                            placeholder="Enter phone number"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                        />
                    </label>
                </Flex>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Email
                        </Text>
                        <TextField.Root
                            placeholder="Enter email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </label>
                </Flex>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Password
                        </Text>
                        <TextField.Root
                            type="password"
                            placeholder="Enter password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
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
                        <Button onClick={handleCreateUser}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default DialogAddUser;
