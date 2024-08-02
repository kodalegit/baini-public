import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Assertion,
  Document,
  FirestoreDocsArr,
  CACHE_KEY_PREFIX,
} from "../types/types";
import ProfileCreatedAction from "../components/ProfileCreatedAction";
import ProfileCreativeWork from "../components/ProfileCreativeWork";
import ProfileTrainAssertions from "../components/ProfileTrainAssertions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "../auth/ContextProvider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PaginationSection from "@/components/PaginationSection";
import localforage from "localforage";
import { loadFromFirestore } from "@/auth/firebase";
import { Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Profile() {
  const { currentUser } = useAuth();
  const [documentArr, setdocumentArr] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const CACHE_KEY = `${CACHE_KEY_PREFIX}${userId}`;

  useEffect(() => {
    if (currentUser && currentUser.uid === userId) {
      const loadDocuments = async () => {
        try {
          const cachedDocs: FirestoreDocsArr =
            await localforage.getItem(CACHE_KEY);
          if (cachedDocs) {
            const deserializedDocs = cachedDocs.map((doc) => ({
              ...doc,
              created_at: Timestamp.fromMillis(
                doc.created_at.seconds * 1000 +
                  doc.created_at.nanoseconds / 1000000,
              ),
            }));
            setdocumentArr(deserializedDocs);
            setLoading(false);
          } else {
            const fetchedFirestoreDocs = await loadFromFirestore(userId);
            setdocumentArr(fetchedFirestoreDocs);
            setLoading(false);
            await localforage.setItem(
              CACHE_KEY,
              fetchedFirestoreDocs.map((doc) => ({
                ...doc,
                created_at: {
                  seconds: doc.created_at.seconds,
                  nanoseconds: doc.created_at.nanoseconds,
                },
              })),
            );
          }
        } catch (error) {
          console.error("Error loading documents: ", error);
        }
      };

      loadDocuments();
    } else {
      throw new Error("Profile does not exist.");
    }
  }, []);

  const refreshDocs = async () => {
    if (currentUser && currentUser.uid === userId) {
      setLoading(true);
      const fetchedFirestoreDocs = await loadFromFirestore(userId);
      setdocumentArr(fetchedFirestoreDocs);
      setCurrentPage(1);
      setLoading(false);
      await localforage.setItem(
        CACHE_KEY,
        fetchedFirestoreDocs.map((doc) => ({
          ...doc,
          created_at: {
            seconds: doc.created_at.seconds,
            nanoseconds: doc.created_at.nanoseconds,
          },
        })),
      );
    }
  };

  const totalItems = documentArr.length;
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentDocuments = documentArr.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {currentUser && (
        <>
          <div className="my-8 flex flex-col justify-between space-y-6 md:flex-row">
            <div className="flex flex-initial gap-4">
              <div className="h-14 w-14 overflow-hidden rounded-full">
                <img alt="User Avatar" src={currentUser.photoURL ?? ""} />
              </div>
              <div>
                <p className="font-raleway text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {currentUser.displayName}
                </p>
                <p className="font-lato text-slate-500">{currentUser.email}</p>
              </div>
            </div>
            <div>
              <Button variant="ghost">
                <Link
                  className="text-slate-800 dark:text-slate-200"
                  to="update"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
          <Separator className="mb-3" />
        </>
      )}
      <div className="my-8 flex justify-center gap-4">
        <div className="text-center font-raleway text-3xl font-bold text-slate-800 dark:text-slate-200">
          Signed Credentials
        </div>
        <HoverCard>
          <HoverCardTrigger asChild>
            <button onClick={refreshDocs}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 stroke-slate-600 hover:stroke-teal-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-20 p-1 text-center">
            Refresh
          </HoverCardContent>
        </HoverCard>
      </div>
      <Table className="rounded-md font-lato text-slate-800 shadow dark:text-slate-200">
        <TableCaption>Recent Activity</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && (
            <>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-6 w-[100px] md:w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[100px] md:w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-6" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-6 w-[100px] md:w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[100px] md:w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-6" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-6 w-[100px] md:w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[100px] md:w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-6" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-6 w-[100px] md:w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[100px] md:w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-6" />
                </TableCell>
              </TableRow>
            </>
          )}
          {!loading && documentArr.length === 0 && (
            <TableRow>
              <TableCell colSpan={2}>No signing performed.</TableCell>
            </TableRow>
          )}
          {!loading &&
            currentDocuments.map((document: Document, index) => (
              <TableRow key={index}>
                <TableCell>{document.title}</TableCell>
                <TableCell>
                  {document.created_at.toDate().toDateString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 hover:fill-emerald-200"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
                        />
                      </svg>
                    </DialogTrigger>
                    <DialogContent className="text-slate-800 dark:text-slate-100">
                      <DialogHeader>
                        <DialogTitle>Bound Credentials</DialogTitle>
                        <DialogDescription>
                          Assertions made when signing image
                        </DialogDescription>
                      </DialogHeader>
                      <div key={index}>
                        {document.assertions.map(
                          (assertion: Assertion, index) =>
                            assertion.label === "c2pa.actions" ? (
                              <ProfileCreatedAction
                                key={index}
                                data={assertion.data}
                              />
                            ) : assertion.label === "c2pa.training-mining" ? (
                              <ProfileTrainAssertions
                                key={index}
                                data={assertion.data}
                              />
                            ) : assertion.label ===
                              "stds.schema-org.CreativeWork" ? (
                              <ProfileCreativeWork
                                key={index}
                                data={assertion.data}
                              />
                            ) : null,
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
      <PaginationSection
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
