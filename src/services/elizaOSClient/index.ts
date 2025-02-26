import axios from 'axios';
import { ELIZAOS_API_URL } from '@/config';

interface startAgentProps {
  characterJson: string;
  characterPath?: string | null;
}

export async function startAgentElizaOS({
  characterJson,
  characterPath = null,
}: startAgentProps) {
  try {
    const response = await axios.post(`${ELIZAOS_API_URL}/agent/start`, {
      characterPath,
      characterJson,
    });

    return response.data; // Return agent details
  } catch (error: any) {
    console.error(
      'Error starting agent:',
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || 'Failed to start agent');
  }
}

interface stopAgentProps {
  agentId: string;
}
export async function stopAgentElizaOS({ agentId }: stopAgentProps) {
  try {
    const response = await axios.post(
      `${ELIZAOS_API_URL}/agents/${agentId}/stop`
    );

    return response.data; // Return agent details
  } catch (error: any) {
    console.error(
      'Error starting agent:',
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || 'Failed to start agent');
  }
}

interface updateAgentProps {
  agentId: string;
  characterJson: Record<string, any>;
}
export async function updateAgentElizaOS({ agentId, characterJson }: updateAgentProps) {
  try {
    const response = await axios.post(`${ELIZAOS_API_URL}/agents/${agentId}/set`, characterJson);

    return response.data; // Return updated agent details
  } catch (error: any) {
    console.error(
      'Error updating agent:',
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || 'Failed to update agent');
  }
}
