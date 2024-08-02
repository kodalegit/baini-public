import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const COLLECTION = "user-assertions";

export const deleteOrphanRecords = functions.auth
  .user()
  .onDelete(async (user) => {
    const db = admin.firestore();
    const batch = db.batch();
    const docsToDelete = await db
      .collection(COLLECTION)
      .where("userID", "==", user.uid)
      .get();

    docsToDelete.forEach((doc) => {
      batch.delete(doc.ref);
    });

    return batch.commit();
  });
