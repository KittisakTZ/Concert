import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { deleteVenue } from "@/services/venue.service";

type DialogVenueProps = {
    getVenueData: Function;
    venue_Id: string;
    venue_name: string;
};

const AlertDialogDeleteVenue = ({ getVenueData, venue_Id, venue_name }: DialogVenueProps) => {
    const handleDeleteVenue = async () => {
        try {
            const resDeleteVenue = await deleteVenue({
                venue_Id: venue_Id,
            });
            if (resDeleteVenue.statusCode === 200) {
                getVenueData(); // Refresh the venue data
            } else {
                alert("Failed to delete the venue. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting venue:", error);
            alert("An error occurred while deleting the venue.");
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
                <AlertDialog.Title>Delete Venue</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    <strong>Venue Name : </strong>{venue_name}
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={handleDeleteVenue}>
                            Delete
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default AlertDialogDeleteVenue;
