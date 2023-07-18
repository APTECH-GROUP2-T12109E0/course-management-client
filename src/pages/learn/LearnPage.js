import React, { useEffect, useRef, useState } from "react";

import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TabsAntCom } from "../../components/ant";
import { CommentCom } from "../../components/comment";
import GapYCom from "../../components/common/GapYCom";
import LoadingCom from "../../components/common/LoadingCom";
import { DialogNextVideoMuiCom, RatingListMuiCom } from "../../components/mui";
import ExamResultMuiCom from "../../components/mui/ExamResultMuiCom";
import { NoteCom } from "../../components/note";
import { selectUserId } from "../../store/auth/authSelector";
import {
  selectAllCourseState,
  selectIsLoadLearningStatus,
  selectIsLoading,
} from "../../store/course/courseSelector";
import {
  onCountdown,
  onGenerateCourseExam,
  onGetEnrollId,
  onGetMyLearning,
  onGetTrackingLesson,
  onLoadProgress,
  onManualSelectedLesson,
  onMyCourseLoading,
  onReady,
  onReload,
  onRetakeExam,
  onSaveTrackingVideo,
  onSelectedCourse,
  onUpdateCompletedVideo,
} from "../../store/course/courseSlice";
import { getToken } from "../../utils/auth";
import { Paper } from "@mui/material";
import { v1 } from "uuid";

const LearnPage = () => {
  const {
    data,
    courseId,
    enrollId,
    lessonId,
    video,
    captionData,
    sectionId,
    tracking,
    isReady,
    isReload,
    learning,
    progress,
    generateExamSuccess,
    examination,
    retakeExam,
    countdown,
    prevTime,
  } = useSelector(selectAllCourseState);

  const isLoading = useSelector(selectIsLoading);
  const [isPlaying, setIsPlaying] = useState(false);
  // const [isSeek, setIsSeek] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  // const [isReady, setIsReady] = useState(ready);
  const [isCompleted, setIsCompleted] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  // const [readyExam, setReadyExam] = useState(false);

  const { slug } = useParams();
  const userId = useSelector(selectUserId);

  const isLoadLearningStatus = useSelector(selectIsLoadLearningStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const player = useRef();

  const { access_token } = getToken();

  useEffect(() => {
    if (data?.length === 0) {
      dispatch(onMyCourseLoading(userId));
    }
    if (data?.length > 0) {
      dispatch(onSelectedCourse(slug));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.length, slug, userId]);

  useEffect(() => {
    if (courseId) {
      dispatch(onGetEnrollId({ course_id: courseId, user_id: userId }));
      dispatch(onRetakeExam({ userId: userId, courseId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, userId]);
  useEffect(() => {
    if (courseId > 0 && enrollId > 0) {
      dispatch(onGetMyLearning({ courseId, enrollId }));
      dispatch(onLoadProgress({ courseId, enrollmentId: enrollId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, enrollId]);

  useEffect(() => {
    if (isLoadLearningStatus) {
      dispatch(onGetTrackingLesson({ enrollmentId: enrollId, courseId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, enrollId, isLoadLearningStatus]);

  useEffect(() => {
    if (isCompleted === 1) {
      dispatch(
        onUpdateCompletedVideo({
          enrollmentId: enrollId,
          courseId: courseId,
          sectionId: sectionId,
          lessonId: lessonId,
          videoId: video.id,
          resumePoint: player.current.getCurrentTime(),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted]);

  useEffect(() => {
    setIsCompleted(0);
  }, [lessonId]);
  useEffect(() => {
    console.log("isPlaying:", isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    const countDown =
      retakeExam?.created_at === null
        ? 0
        : Math.floor(new Date(retakeExam?.created_at).getTime() / 1000) +
          60 -
          Math.floor(Date.now() / 1000);

    const interval = setInterval(() => {
      if (countDown > 0) {
        dispatch(onCountdown(countDown - 1));
      }
    }, 1000);
    return () => clearInterval(interval);
  });
  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleGetProgress = ({ playedSeconds, played }) => {
    console.log(playedSeconds);
    if (played > 0.9) {
      setIsCompleted((prev) => prev + 1);
    }
    setPlayedSeconds(playedSeconds);
  };

  const handleEnded = () => {
    console.log("onSaveTrackingVideo - handleEnded");
    if (progress === 100) {
      // const countDown =
      //   retakeExam && retakeExam.created_at === null
      //     ? 0
      //     : Math.floor(new Date(retakeExam?.created_at).getTime() / 1000) + 60;
      // const now = Math.floor(Date.now() / 1000);

      // console.log(countDown);
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      if ((retakeExam && retakeExam.created_at === null) || countdown === -1) {
        setIsFinal(true);
      } else {
        setIsFinal(false);
      }
    }

    nextLesson =
      learning.lessonDto[
        learning.lessonDto.findIndex((dto) => dto.id === lessonId) + 1
      ];

    if (nextLesson === undefined && countdown > 0) {
      setIsEnd(false);
      return;
    }
    if (nextLesson || progress === 100) {
      setIsEnd(true);
    }

    // if (lessonId > 0 && video.id > 0 && sectionId > 0) {
    //   dispatch(
    //     onSaveTrackingVideo({
    //       enrollmentId: enrollId,
    //       courseId: courseId,
    //       sectionId: sectionId,
    //       lessonId: lessonId,
    //       videoId: video.id,
    //       resumePoint: player.current.getCurrentTime(),
    //     })
    //   );
    // }
  };

  const handlePauseVideo = () => {
    setIsPlaying(false);
    if (lessonId > 0 && video.id > 0 && sectionId > 0) {
      dispatch(
        onSaveTrackingVideo({
          enrollmentId: enrollId,
          courseId: courseId,
          sectionId: sectionId,
          lessonId: lessonId,
          videoId: video.id,
          resumePoint: player.current.getCurrentTime(),
        })
      );
    }
  };

  const onWriteNote = (isShowNote) => {
    if (!isShowNote) setIsPlaying(false);
  };
  const onSelectNote = (resumePoint) => {
    player.current.seekTo(resumePoint);
  };

  const handleSeekVideo = () => {
    // console.log("handleSeekVideo - isPlaying: ", isPlaying);
    // setIsPlaying(false);
    // setIsSeek(true);
  };

  window.onbeforeunload = function (e) {
    dispatch(onReload(true));

    if (lessonId > 0 && video.id > 0 && sectionId > 0) {
      dispatch(
        onSaveTrackingVideo({
          enrollmentId: enrollId,
          courseId: courseId,
          sectionId: sectionId,
          lessonId: lessonId,
          videoId: video.id,
          resumePoint: player.current.getCurrentTime(),
        })
      );
    }
  };

  const handleOnReady = React.useCallback(() => {
    if (!isReady || isReload) {
      console.log("ASLDKJSADLJASLKJDLSKADJLKDJLSKAJDKLSADJL");
      player.current.seekTo(tracking ? tracking.resumePoint : 0);
      dispatch(onReady(true));
      dispatch(onReload(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, isReload, tracking]);

  const handleCloseDialog = () => {
    setIsEnd(false);
  };

  let nextLesson =
    learning.lessonDto[
      learning.lessonDto.findIndex((dto) => dto.id === tracking?.lessonId) + 1
    ];
  const handleNexVideo = () => {
    // const nextLesson =
    //   learning.lessonDto[
    //     learning.lessonDto.findIndex((dto) => dto.id === tracking.lessonId) + 1
    //   ];

    if (nextLesson !== undefined) {
      navigate(`/learn/${slug}?id=${nextLesson.id}`);
      dispatch(
        onManualSelectedLesson({
          enrollmentId: enrollId,
          courseId,
          sectionId: nextLesson.sectionId,
          lessonId: nextLesson.id,
        })
      );
    }

    setIsEnd(false);
  };

  const handleInitialExam = () => {
    dispatch(onGenerateCourseExam({ courseId, userId }));
  };

  useEffect(() => {
    if (prevTime > 0) {
      navigate("/exam");
    }
  }, [prevTime]);

  useEffect(() => {
    if (generateExamSuccess && examination.length > 0) {
      navigate("/exam");
    } else if (generateExamSuccess && examination.length === 0) {
      // dispatch(onSetGenerateExamSuccess)
      toast.warning(
        "Sorry for unconvenience. The examination is not available for this course."
      );
    }
    setIsEnd(false);
  }, [examination, generateExamSuccess, navigate]);

  const course = data.find((c) => c.id === courseId);
  const tabItems = [
    {
      key: "1",
      label: `Description`,
      children: (
        <Paper
          square
          elevation={5}
          sx={{
            padding: "20px",
            width: "100%",
            mt: "20px",
            borderRadius: "10px",
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: course && course.description }}
          ></div>
        </Paper>
      ),
    },
    {
      key: "2",
      label: `Note`,
      children: (
        <Paper
          square
          elevation={5}
          sx={{
            padding: "20px",
            width: "100%",
            mt: "20px",
            borderRadius: "10px",
          }}
        >
          <NoteCom
            notePoint={playedSeconds}
            onWriteNote={onWriteNote}
            onSelectNote={onSelectNote}
          />
        </Paper>
      ),
    },
    {
      key: "3",
      label: `Rating`,
      // check điều kiện user rating xong thì thêm props readOnly
      children: (
        // <RatingMuiCom defaultValue={3.5} readOnly></RatingMuiCom>,
        <Paper
          square
          elevation={5}
          sx={{
            padding: "20px",
            width: "100%",
            mt: "10px",
            borderRadius: "10px",
          }}
        >
          <RatingListMuiCom></RatingListMuiCom>
        </Paper>
      ),
    },
    {
      key: "4",
      label: `Comment`,
      children: (
        <Paper
          square
          elevation={5}
          sx={{
            padding: "20px",
            width: "100%",
            mt: "20px",
            borderRadius: "10px",
          }}
        >
          <CommentCom type="COURSE" />
        </Paper>
      ),
    },
    progress === 100
      ? {
          key: "5",
          label: `Examination`,
          children: <ExamResultMuiCom />,
        }
      : "",
  ];

  return isLoading ? (
    <LoadingCom></LoadingCom>
  ) : (
    <React.Fragment>
      <DialogNextVideoMuiCom
        nextLesson={nextLesson && nextLesson.name}
        open={isEnd}
        onClose={handleCloseDialog}
        onNext={isFinal ? handleInitialExam : handleNexVideo}
        isFinal={isFinal}
      ></DialogNextVideoMuiCom>
      <div className="video-container">
        <div className="video-item">
          <ReactPlayer
            ref={player}
            width="100%"
            height="500px"
            url={video ? `${video.url}?token=${access_token}` : ""}
            config={{
              youtube: {
                playerVars: { showinfo: 1, controls: 1 },
              },
              file: {
                tracks:
                  captionData &&
                  Object.entries(captionData)?.map(([lang, src]) => ({
                    kind: "subtitles",
                    src: src,
                    srcLang: lang,
                    default: lang === "en",
                  })),
                attributes: {
                  controlsList: "nodownload",
                  crossOrigin: "noorigin",
                },
              },
            }}
            playing={isPlaying}
            controls
            muted
            autoPlay
            onSeek={handleSeekVideo}
            onProgress={handleGetProgress}
            onPause={handlePauseVideo}
            onEnded={handleEnded}
            onPlay={handlePlay}
            onReady={handleOnReady}
          />
        </div>
        <GapYCom></GapYCom>
      </div>
      <TabsAntCom items={tabItems}></TabsAntCom>
    </React.Fragment>
  );
};

export default LearnPage;
