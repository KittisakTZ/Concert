import { useEffect, useState } from "react";
import { Table, Card, Flex, Text } from "@radix-ui/themes";
import { getUser } from "@/services/user.service"; // Assuming you have a getUsers service for fetching users
import { TypeUserAll } from "@/types/response/response.user"; // Assuming the user data type is defined here
import DialogAddUser from "./components/dialogAddUser";
import DialogEditUser from "./components/dialogEditUser";
import AlertDialogDeleteUser from "./components/alertDialogDeleteUser";

export default function UsersFeature() {
    const [users, setUsers] = useState<TypeUserAll[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch user data
    const getUsersData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getUser();
            console.log("API Response:", res);  // Log the full response to check the structure
            if (res?.data && Array.isArray(res.data)) {
                setUsers(res.data); // Update state with the fetched users
            } else {
                setError("Invalid response structure or no users found.");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setError("An error occurred while fetching users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsersData(); // Fetch users data when the component mounts
    }, []);

    return (
        <div className="container mx-auto pt-6 px-4">
            <Card variant="surface" className="max-w-4xl w-full mx-auto p-6">
                <Flex className="w-full" direction="row" gap="4" align="center">
                    <Text as="div" size="2" weight="bold" className="text-lg">Users</Text>
                    {/* Pass getUsersData to DialogAddUser to trigger refresh after adding a user */}
                    <DialogAddUser getUsersData={getUsersData} />
                </Flex>

                {loading && <Text className="text-center text-gray-600">Loading users...</Text>} {/* Loading message */}
                {error && <Text color="red" className="text-center">{error}</Text>} {/* Error message */}

                {!loading && !error && (
                    <Table.Root className="mt-4">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {users.length > 0 ? (
                                users.map((user: TypeUserAll) => (
                                    <Table.Row key={user.user_Id}>
                                        <Table.RowHeaderCell>{user.user_Id}</Table.RowHeaderCell>
                                        <Table.Cell>{user.title}</Table.Cell>
                                        <Table.Cell>{user.fname}</Table.Cell>
                                        <Table.Cell>{user.lname}</Table.Cell>
                                        <Table.Cell>{user.phone}</Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>
                                            <DialogEditUser
                                                getUsersData={getUsersData}
                                                user_Id={user.user_Id}
                                                title={user.title}
                                                fname={user.fname}
                                                lname={user.lname}
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <AlertDialogDeleteUser
                                                getUsersData={getUsersData}
                                                user_Id={user.user_Id}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell colSpan={8} className="text-center">No users available.</Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Root>
                )}
            </Card>
        </div>
    );
}
