import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { deleteConcert } from "@/services/concert.service";

type DialogConcertProps = {
    getConcertsData: Function;
    concert_Id: string;
    concert_name: string;
};

const AlertDialogDeleteConcert = ({ getConcertsData, concert_Id, concert_name }: DialogConcertProps) => {
    const handleDeleteConcert = async () => {
        try {
            const response = await deleteConcert({ concert_Id });
            if (response.statusCode === 200) {
                getConcertsData(); // Refresh the data after deletion
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error("Error deleting concert:", error);
            alert("An error occurred while deleting the concert.");
        }
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color="red" size="1" variant="soft">Delete</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete Concert</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    <strong>Concert Name: </strong>{concert_name}
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={handleDeleteConcert}>
                            Delete
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default AlertDialogDeleteConcert;