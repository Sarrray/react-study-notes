import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
  Divider,
  Card,
  Grid,
  CardContent,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemIcon,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { deleteRoom, enterRoom, resetChat } from "../../store/chatSlice";
import * as S from "./Style";
import { resetUser, updateUserName } from "../../store/userSlice";
import InfoIcon from "@mui/icons-material/Info";

const RoomList = () => {
  const [newRoomId, setNewRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { visitedRooms, messages } = useSelector(
    (state: RootState) => state.chat
  );
  const user = useSelector((state: RootState) => state.user);
  const hintMessages = [
    "バックエンドは作成しておらず、リアルタイム通信やサーバー側の保存処理が存在しない。そのため、チャットの内容は他のユーザーと共有されない",
    "チャット情報はReduxで管理し、sessionStorageに保存しているため、タブを閉じない限りデータは保持される",
    "動作確認しやすいように、現時点ではユーザー名が異なれば別人、同じであれば同一人物として判定している",
  ];

  useEffect(() => {
    setUsername(user.name ?? "");
  }, [user.name]);

  const handleNewRoom = () => {
    if (newRoomId.trim()) {
      handleEnterRoom(newRoomId.trim());
      setNewRoomId("");
    }
  };

  const handleEnterRoom = (roomId: string) => {
    if (!user.id || !user.name) {
      alert("ユーザー名を設定してください");
      return;
    }
    dispatch(enterRoom(roomId));
    navigate(`/chat/${roomId}`);
  };

  const handleDeleteRoom = (roomId: string) => {
    dispatch(deleteRoom(roomId));
  };

  const handleUsernameSubmit = () => {
    if (username.trim() && user.id) {
      dispatch(updateUserName(username.trim()));
      setShowSuccess(true);
      setIsModalOpen(false);
      setTimeout(() => {
        setShowSuccess(false);
      }, 1500);
    }
  };

  const handleModalClose = () => {
    setUsername(user.name || "");
    setIsModalOpen(false);
  };

  const handleReset = () => {
    dispatch(resetChat());
    dispatch(resetUser());
    setIsResetConfirmOpen(false);
    setNewRoomId("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNewRoom();
    }
  };

  return (
    <S.Container>
      <Grid container spacing={10}>
        <Grid item md={12} lg={7}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Typography variant="h5" gutterBottom mt={1}>
              ルームに参加
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body1">
                ユーザー名: {user.name || "未設定"}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setIsModalOpen(true)}
                size="small"
              >
                ユーザー名変更
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setIsResetConfirmOpen(true)}
                size="small"
              >
                データ初期化
              </Button>
            </Box>
          </Box>
          {showSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              ユーザー名を保存しました
            </Alert>
          )}
          <Box>
            <Box display="flex" mb={3} gap={2}>
              <TextField
                label="ルーム名を入力"
                variant="outlined"
                value={newRoomId}
                onChange={(e) => setNewRoomId(e.target.value)}
                onKeyDown={handleKeyDown}
                fullWidth
              />
              <Button
                variant="contained"
                onClick={handleNewRoom}
                disabled={!newRoomId.trim()}
              >
                参加
              </Button>
            </Box>
            <Divider />
            <List>
              <Typography variant="h5" gutterBottom mt={1}>
                ルーム一覧
              </Typography>
              {visitedRooms.map((roomId) => (
                <ListItem
                  key={roomId}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteRoom(roomId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`ルーム名: ${roomId}`}
                    secondary={`メッセージ件数: ${
                      messages[roomId]?.length || 0
                    }`}
                    onClick={() => handleEnterRoom(roomId)}
                    sx={{ cursor: "pointer" }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item md={12} lg={5}>
          <Card sx={{ backgroundColor: "#f9f9f9", mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ルーム使用のヒント
              </Typography>
              <List dense>
                {hintMessages.map((message, index) => {
                  return (
                    <div key={index}>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <InfoIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={message} />
                      </ListItem>
                    </div>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="modal-set-username"
      >
        <DialogTitle>ユーザー名の変更</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ユーザー名"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!username.trim()}
            helperText={!username.trim() ? "ユーザー名を入力してください" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>キャンセル</Button>
          <Button onClick={handleUsernameSubmit} disabled={!username.trim()}>
            設定
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
        aria-labelledby="modal-reset"
      >
        <DialogTitle>データ初期化の確認</DialogTitle>
        <DialogContent>
          <Typography>
            すべての設定とチャット履歴を初期化します。
            <br />
            この操作は取り消せません。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsResetConfirmOpen(false)}>
            キャンセル
          </Button>
          <Button onClick={handleReset} color="error">
            データ初期化
          </Button>
        </DialogActions>
      </Dialog>
    </S.Container>
  );
};

export default RoomList;
