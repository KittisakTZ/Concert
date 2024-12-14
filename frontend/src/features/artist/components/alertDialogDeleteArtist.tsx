import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { deleteCategory } from "@/services/artist.service";

type DialogArtistProps ={ 
    getArtistsData: Function;
    artist_Id: string;
    artist_name: string;
}
const AlertDialogDeleteArtist = ({getArtistsData, artist_Id, artist_name}: DialogArtistProps) => {

    const handleDeleteArtist = async () => {
        try {
            const resDeleteArtist = await deleteCategory({ 
                artist_Id: artist_Id
            });
            getArtistsData();
        } catch (error) {
            console.error("Error Delete artist:", error);
        }
    };
    return(
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color="red" size="1" variant="soft">Delete</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete Artist</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    <strong>Artist Name : </strong>{artist_name}
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={handleDeleteArtist}>
                            Delete
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}
export default AlertDialogDeleteArtist;