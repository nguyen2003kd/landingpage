# Tổng hợp kiến thức dự án Landing Page Builder

## 1. Kiến trúc tổng thể dự án

### a. Mục tiêu
- Xây dựng một công cụ kéo-thả (drag & drop) để tạo landing page.
- Cho phép thêm, chỉnh sửa, xóa, sắp xếp các thành phần (component) như Text, Button, Image, Card, Divider.
- Lưu trữ bố cục dưới dạng JSON, dễ dàng xuất/nhập hoặc lưu backend.

### b. Công nghệ sử dụng
- **React**: Thư viện xây dựng giao diện người dùng.
- **Zustand**: Quản lý state toàn cục.
- **@dnd-kit/core, @dnd-kit/sortable**: Thư viện kéo-thả mạnh mẽ cho React.
- **Tailwind CSS**: Thiết kế giao diện hiện đại, responsive.
- **TypeScript**: Kiểm soát kiểu dữ liệu, tăng độ an toàn.

---

## 2. Các khái niệm và từ khóa quan trọng

### a. Component
- **Giải thích:** Thành phần giao diện nhỏ, có thể tái sử dụng (ví dụ: Text, Button, Image, Card, Divider).
- **Ví dụ:**
  ```tsx
  <ButtonElement props={...} isSelected={true} onClick={...} />
  ```
- **Tác dụng:** Xây dựng giao diện linh hoạt, dễ mở rộng.

### b. Element
- **Giải thích:** Một instance của component đã được thả vào canvas, có id, type, props, position.
- **Ví dụ:**
  ```ts
  {
    id: "element-123",
    type: "text",
    props: { content: "Xin chào", fontSize: 20, color: "#333" },
    position: { x: 100, y: 200 }
  }
  ```
- **Tác dụng:** Lưu trữ thông tin từng thành phần trên canvas.

### c. Props
- **Giải thích:** Thuộc tính cấu hình cho từng element (nội dung, màu sắc, link, v.v.).
- **Ví dụ:**
  ```ts
  { content: "Hello", fontSize: 18, color: "#000" }
  ```
- **Tác dụng:** Tùy biến hiển thị và hành vi của component.

### d. State (Zustand)
- **Giải thích:** Quản lý trạng thái toàn bộ elements, element đang chọn, các thao tác thêm/xóa/cập nhật.
- **Ví dụ:**
  ```ts
  const { elements, addElement, updateElement } = useElementStore();
  ```
- **Tác dụng:** Đảm bảo dữ liệu nhất quán, dễ dàng thao tác từ bất kỳ component nào.

### e. Drag & Drop
- **Giải thích:** Kéo-thả component từ sidebar vào canvas, hoặc di chuyển vị trí trên canvas.
- **Ví dụ:**
  - Kéo Text từ sidebar, thả vào canvas tại vị trí chuột.
  - Di chuyển một Card đã có trên canvas sang vị trí khác.
- **Tác dụng:** Tạo trải nghiệm trực quan, dễ sử dụng cho người dùng.

### f. JSON Layout
- **Giải thích:** Dữ liệu toàn bộ bố cục được lưu dưới dạng JSON.
- **Ví dụ:**
  ```json
  [
    { "id": "element-1", "type": "text", "props": { ... }, "position": { "x": 100, "y": 50 } },
    { "id": "element-2", "type": "button", "props": { ... }, "position": { "x": 200, "y": 100 } }
  ]
  ```
- **Tác dụng:** Dễ dàng lưu trữ, xuất/nhập, đồng bộ với backend.

---

## 3. Các file và chức năng chính

### a. `src/types/element.ts`
- Định nghĩa kiểu dữ liệu cho element, props, sidebar item.
- **Tác dụng:** Chuẩn hóa dữ liệu, dễ mở rộng.

### b. `src/store/elementStore.ts`
- Store Zustand quản lý toàn bộ state.
- **Tác dụng:** Thêm, cập nhật, xóa, chọn, di chuyển element; xuất/nhập JSON.

### c. `src/data/sidebarItems.ts`
- Danh sách các component có thể kéo-thả.
- **Tác dụng:** Dễ dàng thêm mới component.

### d. `src/components/Sidebar.tsx`
- Hiển thị các component có thể kéo-thả.
- **Tác dụng:** Nguồn kéo-thả cho canvas.

### e. `src/components/Canvas.tsx`
- Vùng hiển thị các element đã thả.
- **Tác dụng:** Khu vực làm việc chính của người dùng.

### f. `src/components/SettingsPanel.tsx`
- Panel chỉnh sửa thuộc tính element đang chọn.
- **Tác dụng:** Tùy chỉnh nội dung, xóa element.

### g. `src/components/elements/ElementRenderer.tsx`
- Render đúng component theo type.
- **Tác dụng:** Tái sử dụng, mở rộng dễ dàng.

### h. `src/components/DragDropProvider.tsx`
- Quản lý logic kéo-thả, tạo element mới, di chuyển element.
- **Tác dụng:** Kết nối các thao tác kéo-thả với state.

### i. `src/components/Header.tsx`
- Chứa các nút Export/Import/Clear All.
- **Tác dụng:** Quản lý dữ liệu bố cục.

---

## 4. Ví dụ sử dụng thực tế

### Thêm một Text mới vào canvas
1. Kéo Text từ sidebar, thả vào canvas.
2. Một element mới được tạo với id, type, props mặc định, vị trí theo chuột.

### Chỉnh sửa nội dung Text
1. Click vào Text trên canvas.
2. Panel bên phải hiện form chỉnh sửa.
3. Sửa nội dung, màu sắc, font size, v.v.

### Xóa một element
1. Chọn element trên canvas.
2. Nhấn nút Delete trong SettingsPanel.

### Xuất bố cục ra JSON
1. Nhấn Export JSON trên Header.
2. File layout.json được tải về.

### Nhập bố cục từ JSON
1. Nhấn Import JSON trên Header.
2. Chọn file layout.json đã lưu.
3. Bố cục được load lại trên canvas.

---

## 5. Cách mở rộng dự án

- **Thêm component mới:**  
  Thêm vào `sidebarItems.ts`, tạo file renderer mới, cập nhật `ElementRenderer.tsx`.
- **Thêm thuộc tính mới:**  
  Mở rộng interface `ElementProps`, cập nhật SettingsPanel.
- **Kết nối backend:**  
  Gửi/nhận JSON layout qua API.
- **Tính năng nâng cao:**  
  Undo/Redo, multi-select, responsive preview, v.v.

---

## 6. Tóm tắt các từ khóa quan trọng

| Từ khóa         | Ý nghĩa/Tác dụng                                                                 | Ví dụ sử dụng                                  |
|-----------------|----------------------------------------------------------------------------------|------------------------------------------------|
| **Component**   | Thành phần giao diện nhỏ, tái sử dụng                                            | `<ButtonElement ... />`                        |
| **Element**     | Một instance của component trên canvas                                           | `{ id, type, props, position }`                |
| **Props**       | Thuộc tính cấu hình cho element                                                  | `{ content: "Hello", color: "#000" }`      |
| **State**       | Trạng thái toàn cục quản lý bằng Zustand                                         | `useElementStore()`                            |
| **Drag & Drop** | Kéo-thả component từ sidebar vào canvas, di chuyển vị trí                        | Kéo Text vào canvas                            |
| **JSON Layout** | Dữ liệu bố cục, dùng để lưu trữ, xuất/nhập, đồng bộ backend                      | `[ { id, type, props, position }, ... ]`       |
| **Sidebar**     | Thanh bên trái chứa các component có thể kéo-thả                                 | `src/components/Sidebar.tsx`                   |
| **Canvas**      | Vùng làm việc chính, hiển thị các element đã thả                                 | `src/components/Canvas.tsx`                    |
| **SettingsPanel**| Panel bên phải, chỉnh sửa thuộc tính element                                    | `src/components/SettingsPanel.tsx`             |
| **ElementRenderer**| Render đúng component theo type                                               | `src/components/elements/ElementRenderer.tsx`  |
| **Header**      | Thanh trên cùng, chứa các nút Export/Import/Clear All                            | `src/components/Header.tsx`                    |

---

## 7. Kết luận

Dự án này là một ví dụ điển hình về cách xây dựng một hệ thống kéo-thả hiện đại, dễ mở rộng, quản lý state hiệu quả, giao diện đẹp và thân thiện với người dùng.  
Bạn có thể dễ dàng thêm mới, chỉnh sửa, lưu trữ, và tái sử dụng bố cục landing page cho nhiều mục đích khác nhau.

Nếu cần ví dụ code cụ thể cho từng phần, hoặc giải thích sâu hơn về bất kỳ khía cạnh nào, hãy hỏi thêm nhé! 