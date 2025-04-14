import React, { useEffect, useRef, useState } from 'react';
import { Modal, Upload, Button, App as AntdApp} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

function CheckoutModal({ visible, onClose, onConfirm }) {
  const { notification } = AntdApp.useApp();
  const [timeLeft, setTimeLeft] = useState(60);
  const [fileList, setFileList] = useState([]);
  const [customAlert, setCustomAlert] = useState(null);

  const fileListRef = useRef([]);
  fileListRef.current = fileList;

  const notifiedRef = useRef(false);

  useEffect(() => {
    if (!visible) return;
    setFileList([]);
    setTimeLeft(60);
    notifiedRef.current = false;
  
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(interval);
    
          if (fileListRef.current.length === 0 && !notifiedRef.current) {
            notification.error({
              message: 'หมดเวลาการชำระเงิน',
              description: 'คุณไม่ได้ส่งสลิปภายในเวลาที่กำหนด\nกรุณาลองใหม่อีกครั้ง!',
              duration: 3,
            });
            notifiedRef.current = true;
          }
    
          onClose(); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
  
    return () => {
      clearInterval(interval);
      notifiedRef.current = true;
    };
  }, [visible]);
  

  return (
    <>
      <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
        title={`โอนเงินภายใน ${timeLeft} วินาที`}
      >
        <p style={{ marginBottom: 10 }}>📍บัญชี: 123-456-789 ธนาคาร MovieBank</p>
        <Dragger
          name="file"
          accept="image/*"
          fileList={fileList}
          listType="picture-card"
          showUploadList={false}
          beforeUpload={(file) => {
            const isImage = file.type.startsWith('image/');
            const isLt800KB = file.size / 1024 < 800;

            if (!isImage) {
              notification.error({
                message: 'อัปโหลดผิดประเภท',
                description: 'กรุณาอัปโหลดเฉพาะไฟล์รูปภาพเท่านั้น',
              });
              return Upload.LIST_IGNORE;
            }
            if (!isLt800KB) {
              notification.error({
                message: 'ไฟล์ใหญ่เกินไป',
                description: 'กรุณาอัปโหลดสลิปที่มีขนาดไม่เกิน 800KB',
              });
              return Upload.LIST_IGNORE;
            }

            return true;
          }}
          onChange={({ file }) => {
            setFileList([file]); 
          }}
          customRequest={({ onSuccess }) => setTimeout(() => onSuccess('ok'), 500)}
          style={{ padding: 16 }}
        >
          {fileList.length === 0 ? (
            <>
              <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ fontSize: 40, color: '#999' }} />
              </p>
              <p className="ant-upload-text">คลิกหรือวางสลิปโอนเงินที่นี่</p>
            </>
          ) : (
            <img
              src={fileList[0].thumbUrl || URL.createObjectURL(fileList[0].originFileObj)}
              alt="slip"
              style={{
                width: '100%',
                maxHeight: 300,
                objectFit: 'contain',
                borderRadius: 8,
              }}
            />
          )}
        </Dragger>

        <Button
          type="primary"
          style={{ marginTop: 16 }}
          onClick={() => {
            onConfirm(); 
            setTimeout(() => {
              notification.success({
                message: 'การชำระเงินเสร็จสิ้น',
                description: 'ระบบได้รับสลิปของคุณแล้ว\nขอบคุณที่ใช้บริการ Movie Store!',
                duration: 3,
              });
              
            }, 300);
          }}
          block
          disabled={fileList.length === 0}
        >
        ยืนยันการโอนเงิน
      </Button>
      </Modal>
    </>
  );
}

export default CheckoutModal;
