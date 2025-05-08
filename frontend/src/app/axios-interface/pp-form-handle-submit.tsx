import uploadAvatar from "./upload-avatar";

export async function ppFormHandleSubmit(e: any, currentUserID: number) {
    e.preventDefault();
    await uploadAvatar(e, currentUserID);
}