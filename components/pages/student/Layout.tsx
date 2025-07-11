// app/routes/__layout.tsx
import { Outlet } from "@remix-run/react";
import Sidebar from "components/common/Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";
import {
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { FcLeave } from "react-icons/fc";
import { CalendarIcon, DetailIcon, FileIcon } from "components/icons";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

import { StudentDataProvider } from "./StudentContext";  // Import StudentDataProvider

// Define dummy components (as before)
const DashboardComponent = () => {
  return (
    <div>
      <h2>Dashboard Component</h2>
      <DashboardContent />  {/* Use DashboardContent */}
    </div>
  );
};
const GeneralComponent = () => <div><h2>General Component</h2><p>This is the General content under Students.</p></div>;
const AttendanceComponent = () => <div><h2>Attendance Component</h2><p>This is the Attendance content under Students.</p></div>;
const StudentsComponent = () => {
  return (
    <div>
      <h2>Students Main Component</h2>
      <StudentsContent />  {/* Use StudentsContent */}
    </div>
  );
};
const ConfigureComponent = () => <div><h2>Configure Main Component</h2><p>This is the main Configure content.</p></div>;

//New Components
import StudentsContent from "./components/StudentsContent";
import DashboardContent from "./components/DashboardContent";
import MapComponent from "../common/MapComponent";
import LeaveForm from "./components/Leave/LeaveForm";
import Calendar from "../common/Calendaar/Calendar";
import Leave from "../student/components/Leave/Leave";
import Attd_Calendar from "./components/Attd_Calendar/Calendar";
import StudentExamViewPage from "./components/Exam";
import StudentAttendancePage from "./components/Attendance/StudentAttendancePage";
import MyRoutinePage from "./components/Routine/MyRoutinePage";
import StudentNotesPage from "./components/Notes/StudentNotesPage";
import StudentGalleryPage from "./components/Gallery/StudentGalleryPage";
import StudentLessonPlanCard from "./components/LessonPlan/StudentLessonPlanCard";
import StudentLessonPlansPage from "./components/LessonPlan/StudentLessonPlansPage";
import StudentMyReviewsPage from "./components/Review/StudentMyReviewsPage";
import StudentAssignmentsPage from "./components/Assignment/StudentAssignmentsPage";
import StudentResultPage from "./components/Result/StudentResultPage";
import StudentDashboard from "./components/Dashboard/StudentDashboard";
// import StudentDash from "./components/Dashboard/StudentDash";


import { BusIcon } from "components/icons";
import { PiExam } from "react-icons/pi";
import { MdOutlineAssignment } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlinePlayLesson } from "react-icons/md";
import { FcGallery } from "react-icons/fc";
import { BookOpenCheck, CalendarSync, Images, NotebookTabs } from "lucide-react";

export default function Layout() {
  const [sidebarState, setSidebarState] = useState<number>(() => {
    const storedState = localStorage.getItem('sidebarState');
    return storedState ? parseInt(storedState, 10) : 0;
  });
  const [activeItem, setActiveItem] = useState("Dashboard");

  const toggleSidebar = () => {
    setSidebarState((prevState) => {
      const newState = prevState === 0 ? 1 : 0;
      localStorage.setItem('sidebarState', newState.toString());
      return newState;
    });
  };

  const sidebarItems = [
    { name: "Dashboard", icon: HomeIcon, component: StudentDashboard },
    {name: "Assignment", icon: MdOutlineAssignment, component: StudentAssignmentsPage}, // Main Attendance component
    {
      name: "Attendance",
      icon: FcLeave,
      // component: StudentsComponent,
      children: [
        { name: "Details", icon: CalendarIcon, component: StudentAttendancePage },
        { name: "Leave Form", icon: FileIcon, component: LeaveForm },
        { name: "Leave Details", icon: DetailIcon, component: Leave },
      ],
    },
    { name: "Bus Location", icon: BusIcon, component: MapComponent },
    { name: "Calendar", icon: CalendarIcon, component: Calendar },
    { name: "Exam", icon: BookOpenCheck, component: StudentExamViewPage },
    {name: "Gallery", icon: Images, component: StudentGalleryPage}, // Main Attendance component
    {name: "Lessons", icon: MdOutlinePlayLesson, component: StudentLessonPlansPage}, // Main Attendance component
    {name: "Notes", icon: NotebookTabs, component: StudentNotesPage}, // Main Attendance component

    {name: "Result", icon: PiExam, component: StudentResultPage}, // Main Attendance component
    {name: "Review", icon: MdOutlineRateReview, component: StudentMyReviewsPage}, // Main Attendance component
    { name: "Routine", icon: CalendarSync, component: MyRoutinePage },




    
  ];

  const getActiveComponent = () => {
    const activeSidebarItem = sidebarItems.find(item => item.name === activeItem);
    if (activeSidebarItem && activeSidebarItem.component) {
      return activeSidebarItem.component;
    }
    for (const parentItem of sidebarItems) {
      if (parentItem.children) {
        const activeChildItem = parentItem.children.find(child => child.name === activeItem);
        if (activeChildItem && activeChildItem.component) {
          return activeChildItem.component;
        }
      }
    }
    return () => <div><h2>Content Not Found</h2><p>No component defined for this menu item.</p></div>;
  };

  const ActiveComponent = getActiveComponent();

  return (
    <StudentDataProvider>  {/* Wrap the content with StudentDataProvider */}
      <div className="flex h-screen bg-gray-100/40">
        <Sidebar
          sidebarState={sidebarState}
          toggleSidebar={toggleSidebar}
          setActiveItem={setActiveItem}
          activeItem={activeItem}
          sidebarItems={sidebarItems}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar toggleSidebar={toggleSidebar} setActiveItem={setActiveItem} />

          <main className="flex-1 overflow-auto mb-2 mr-2 max-w-full">
            <ActiveComponent />
            <Outlet />
          </main>
        </div>
      </div>
    </StudentDataProvider>
  );
}