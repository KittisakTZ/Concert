import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { deleteUser } from "@/services/user.service";

type DialogUserProps = {
    getUsersData: Function;
    user_Id: string; // Make sure this is the correct prop for the user ID
};

const AlertDialogDeleteUser = ({ getUsersData, user_Id }: DialogUserProps) => {

    const handleDeleteUser = async () => {
        try {
            const resDeleteUser = await deleteUser({ 
                user_Id: user_Id, // Pass userId to the deleteUser function
            });
            // Refresh user data after deletion
            getUsersData();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color="red" size="1" variant="soft">
                    Delete
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete User</AlertDialog.Title>
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={handleDeleteUser}>
                            Delete
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default AlertDialogDeleteUser;
