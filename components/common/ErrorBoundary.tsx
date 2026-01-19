import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      // 앱이 크래시되는 대신 이 화면 표시
      return (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600">문제가 발생했습니다</h1>
          <p className="mt-4">페이지를 새로고침해주세요.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            새로고침
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
